export type MenuItem = { name: string; price: number; description?: string };
export type MenuGroup = { title: string; items: MenuItem[]; note?: string };
export type MenuCategory = { id: string; label: string; groups: MenuGroup[] };
const items = (entries: [string, number, string?][]): MenuItem[] => entries.map(([name, price, description]) => ({ name, price, description }));

export const menu: MenuCategory[] = [
  { id: 'coffee', label: 'Coffee', groups: [
    { title: 'Espresso Hot Coffee', note: 'Flavours where applicable: Classic, Vanilla, Hazelnut, Caramel, Mocha, Tiramisu.', items: items([['Americano',150],['Café Latte',160],['Cappuccino',160],['Flat White',160],['Cortado',120],['Macchiato',130]]) },
    { title: 'Iced Coffee', items: items([['Iced Americano',150],['Iced Latte',160],['Iced Cappuccino',160],['Iced Espresso With Tonic',160],['Iced Vietnamese Coffee',160],['Vanilla Affogato',140],['Mocha Affogato',160]]) },
    { title: 'Cloud', items: items([['Coconut Coffee Cloud',220],['Strawberry Coffee Cloud',210],['Espresso Cloud',220],['Matcha Cloud',220],['Salted Brown Butter Coconut Cloud',250],['Ube Cloud',250]]) },
  ]},
  { id: 'cold-coffee', label: 'Cold Coffee', groups: [{ title: 'Cold Coffee', items: items([['Classic Cold Coffee',160],['Choco Blend Cold Coffee',180],['Salted Caramel Cold Coffee',180],['VCA Cold Coffee Classic',170],['VCA Cold Coffee Choco Brownie',230]]) }] },
  { id: 'matcha', label: 'Matcha', groups: [{ title: 'Matcha', items: items([['Classic Matcha Latte (Hot)',170],['Iced Matcha Latte',180],['Mango Matcha Latte',200],['Strawberry Matcha',200],['Blueberry Matcha',200],['Rose Litchi Matcha Latte',200],['Lavender Matcha Latte',200]]) }] },
  { id: 'cold-brew', label: 'Cold Brew', groups: [{ title: 'Cold Brew', items: items([['Cold Brew Straight Up',160],['Cranberry Cold Brew',180],['Cold Brew Tonic',180],['Cold Brew Ginger Ale',180],['Fresh Basil Cold Brew',180],['Berry Sparkle',180],['Sparkling Yuzu',180],['Mango Probiotic Fizz',250]]) }] },
  { id: 'frappes', label: 'Frappes', groups: [{ title: 'Frappes', items: items([['Classic Frappe',160],['Hazelnut Frappe',190],['Java Chip Frappe',180],['Oreo Crunch Frappe',190],['Choco Brownie Frappe',180],['Dark Mocha Frappe',220]]) }] },
  { id: 'mocktails', label: 'Mocktails', groups: [{ title: 'Mocktails', items: items([['Red Guava Fusion',200],['Virgin Mojito',200],['Blended Strawberry Daiquiri',200],['Fun on the Beach',200]]) }] },
  { id: 'chocolate', label: 'Chocolate', groups: [
    { title: 'Hot Chocolate', items: items([['Classic Hot Chocolate',160],['Brownie Hot Chocolate',180],['Choco Hazelnut Hot Chocolate',180]]) },
    { title: 'Cold Chocolate', items: items([['OG Cold Chocolate',160],['Brownie Cold Chocolate',180],['Choco Hazelnut Cold Chocolate',180],['KitKat Cold Chocolate',180],['Oreo Cold Chocolate',180]]) },
  ]},
  { id: 'desserts', label: 'Desserts', groups: [{ title: 'Desserts', items: items([['Choco Walnut Brownie',180],['Nutella Choco Walnut Brownie',200],['Sizzling Choco Walnut Brownie with Vanilla Ice Cream',220]]) }] },
  { id: 'pizza', label: 'Pizza', groups: [{ title: 'Neapolitan Pizza', items: items([
    ['Classic Margherita Pizza',320,'Marinara Sauce, Fresh Mozzarella, Basil & Olive Oil.'],
    ['Peppy Paneer Pizza',350,'Marinara Sauce, Fresh Mozzarella, Spiced Paneer, Peri Peri & Jalapeno.'],
    ['Butter Paneer Pizza',350,'Makhni Sauce, Fresh Mozzarella, Spiced Paneer, Onion Rings.'],
    ['Smoked Paneer Pizza',350,'Marinara Sauce, Fresh Mozzarella, In-House Paneer & Veggies.'],
    ['Veg Farm Pizza',380,'Marinara Sauce, Fresh Mozzarella, Veggies & Herbs.'],
    ['Focaccia Pizza',330,'Marinara Sauce, Fresh Mozzarella, Sun Dried Cherry Tomato, Mixed Bell Peppers & Roasted Onion.'],
    ['Quattro Formaggi',380,'Four Cheese Pizza with Bechamel, Fresh Mozzarella, Parmesan, Cheddar & Bocconcini.'],
    ['Truffle Mushroom',380,'Bechamel, Fresh Mozzarella, Saute Mushroom & Truffle Oil.'],
    ['Pesto Pistachio',380,'Pesto Sauce, Pistachio, Cherry Tomato, Mozzarella.'],
    ['Grilled Mushroom & Sausage',380,'Marinara Sauce, Fresh Mozzarella, Grilled Mushroom & Chicken Sausage.'],
    ["Meat Lovers's Pizza",450,'Marinara Sauce, Fresh Mozzarella, Pepperoni, Sausage & Salami.'],
    ['Butter Chicken Pizza',400,'Makhni Sauce, Fresh Mozzarella, Chicken & Onion Rings.'],
    ['Pahadi Keema Pizza',400,'Fresh Mozzarella, Pahadi Chicken Keema & Onion Rings.'],
    ['Smoked Chicken Pizza',400,'Marinara Sauce, Fresh Mozzarella, In-House Chicken & Veggies.'],
    ['BBQ Chicken Pizza',400,'Marinara Sauce, Fresh Mozzarella, In-House Chicken & Veggies.'],
  ]) }] },
  { id: 'sides', label: 'Sides', groups: [
    { title: 'Garlic Bread', items: items([['Classic Garlic Bread',180]]) },
    { title: 'Sides & Add-ons', items: items([['Cheese',200],['Chicken',60],['Paneer',50],['Single Veggie',30]]) },
  ]},
];
