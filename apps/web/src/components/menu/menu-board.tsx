import { useState } from 'react';
import { useSearchParams } from 'react-router';
import { Search } from 'lucide-react';
import { menu, type MenuItem } from '@/data/menu';
import { images } from '@/data/site';

type Temperature = 'all' | 'hot' | 'iced';

const temperatureOf = (item: MenuItem): 'hot' | 'iced' | 'both' => {
	const name = item.name.toLowerCase();
	if (
		name.includes('iced') ||
		name.includes('cold') ||
		name.includes('frappe') ||
		name.includes('fizz') ||
		name.includes('mojito') ||
		name.includes('tonic')
	) {
		return 'iced';
	}
	if (name.includes('hot')) {
		return 'hot';
	}
	return 'both';
};

export function MenuBoard() {
	const [params, setParams] = useSearchParams();
	const [query, setQuery] = useState('');
	const [temperature, setTemperature] = useState<Temperature>('all');
	const category = menu.find((item) => item.id === params.get('category')) ?? menu[0];

	const normalizedQuery = query.trim().toLowerCase();
	const matches = (item: MenuItem) => {
		if (
			normalizedQuery &&
			!`${item.name} ${item.description ?? ''}`.toLowerCase().includes(normalizedQuery)
		) {
			return false;
		}
		const temp = temperatureOf(item);
		if (temperature === 'hot') {
			return temp === 'hot' || temp === 'both';
		}
		if (temperature === 'iced') {
			return temp === 'iced';
		}
		return true;
	};

	const groups = category.groups
		.map((group) => ({ ...group, items: group.items.filter(matches) }))
		.filter((group) => group.items.length > 0);
	const itemCount = groups.reduce((sum, group) => sum + group.items.length, 0);

	return (
		<section className="menu-board-section">
			<div className="wrap">
				<div className="menu-layout">
					<aside className="menu-sidebar">
						<span className="eyebrow">EXPLORE THE MENU</span>
						<h2>Pick your<br /><em>pleasure.</em></h2>
						<p>Find something for the moment you&rsquo;re in.</p>
						<div className="menu-sidebar-photo">
							<img src={images.cloud} alt="Iced coconut coffee cloud drink" width="800" height="600" loading="lazy" />
						</div>
					</aside>
					<div className="menu-content">
						<div className="menu-tools">
							<label className="menu-search">
								<Search size={15} aria-hidden="true" />
								<input
									type="search"
									value={query}
									onChange={(event) => setQuery(event.target.value)}
									placeholder={`Search ${category.label.toLowerCase()}…`}
									aria-label={`Search ${category.label}`}
								/>
							</label>
							<div className="menu-filters" role="group" aria-label="Filter by temperature">
								{(['all', 'hot', 'iced'] as Temperature[]).map((temp) => (
									<button
										type="button"
										key={temp}
										className={`menu-filter${temperature === temp ? ' active' : ''}`}
										aria-pressed={temperature === temp}
										onClick={() => setTemperature(temp)}
									>
										{temp === 'all' ? 'All' : temp === 'hot' ? 'Hot' : 'Iced'}
									</button>
								))}
							</div>
						</div>
						<div className="menu-tabs" role="tablist" aria-label="Menu categories">
							{menu.map((item) => (
								<button
									type="button"
									role="tab"
									aria-selected={category.id === item.id}
									className={category.id === item.id ? 'active' : ''}
									key={item.id}
									onClick={() => setParams({ category: item.id }, { preventScrollReset: true })}
								>
									{item.label}
								</button>
							))}
						</div>
						<div className="menu-panel" role="tabpanel" key={category.id}>
							<div className="menu-panel-heading">
								<span className="eyebrow">COFFAIRE MENU / {category.label.toUpperCase()}</span>
								<h2>{category.label}<span className="menu-count">{itemCount} ITEMS</span></h2>
							</div>
							{groups.length === 0 ? (
								<p className="menu-no-match">
									Nothing matches your search in {category.label} — try another word or filter.
								</p>
							) : (
								groups.map((group) => (
									<div className="menu-group" key={group.title}>
										<div className="menu-group-heading"><h3>{group.title}</h3><span>PRICE</span></div>
										{group.note && <p className="menu-group-note">{group.note}</p>}
										<div className="menu-items">
											{group.items.map((item) => (
												<div className="menu-item" key={item.name}>
													<div><h4>{item.name}</h4>{item.description && <p>{item.description}</p>}</div>
													<strong>₹{item.price}</strong>
												</div>
											))}
										</div>
									</div>
								))
							)}
							<p className="menu-disclaimer">Menu items, prices and availability may change. Please confirm with the café.</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
