import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeCategory: 'Todos',
  products: [
    {
      id: 1,
      title: 'Core i9-14900K',
      category: 'Procesadores',
      badge: 'PROCESADOR',
      description: 'Intel Core i9-14900K · 24 núcleos · Socket LGA1700',
      tags: ['24 núcleos', '6.0 GHz', 'LGA1700'],
      price: '525,00€',
      image: 'https://placehold.co/280x180/0d1117/ffffff?text=CPU',
    },
    {
      id: 2,
      title: 'RTX 4080 Super',
      category: 'Tarjeta Gráfica',
      badge: 'TARJETA GRÁFICA',
      description: 'NVIDIA GeForce RTX 4080 Super · 16GB GDDR6X',
      tags: ['16GB GDDR6X', 'PCIe 4.0', '320W TDP'],
      price: '1.100,00€',
      image: 'https://placehold.co/280x180/0d1117/ffffff?text=GPU',
    },
    {
      id: 3,
      title: '32GB DDR5 6400MHz',
      category: 'Disco Duro',
      badge: 'MEMORIA RAM',
      description: 'Kingston Fury Beast · DDR5 · Kit 2×16GB',
      tags: ['32GB', 'DDR5', '6400MHz'],
      price: '145,50€',
      image: 'https://placehold.co/280x180/0d1117/ffffff?text=RAM',
    },
    {
      id: 4,
      title: 'Z790 Master X',
      category: 'Herramientas',
      badge: 'PLACA BASE',
      description: 'ASUS ROG Maximus Z790 · ATX · Wi-Fi 7',
      tags: ['LGA1700', 'ATX', 'DDR5'],
      price: '620,00€',
      image: 'https://placehold.co/280x180/0d1117/ffffff?text=MB',
    },
    {
      id: 5,
      title: 'Mouse Precision X1',
      category: 'Herramientas',
      badge: 'PERIFÉRICO',
      description: 'Logitech G Pro X Superlight 2 · 32000 DPI',
      tags: ['32000 DPI', 'Inalámbrico', '60h batería'],
      price: '125,00€',
      image: 'https://placehold.co/280x180/0d1117/ffffff?text=Mouse',
    },
    {
      id: 6,
      title: '2TB Gen5 SSD',
      category: 'Disco Duro',
      badge: 'ALMACENAMIENTO',
      description: 'Samsung 990 Pro · NVMe PCIe 5.0 · M.2',
      tags: ['2TB', 'PCIe 5.0', '14 GB/s'],
      price: '209,00€',
      image: 'https://placehold.co/280x180/0d1117/ffffff?text=SSD',
    },
    {
      id: 7,
      title: 'Hydro Elite 360',
      category: 'Herramientas',
      badge: 'REFRIGERACIÓN',
      description: 'Corsair H150i Elite Capellix · AIO 360mm',
      tags: ['360mm', 'ARGB', 'LGA1700'],
      price: '159,00€',
      image: 'https://placehold.co/280x180/0d1117/ffffff?text=AIO',
    },
    {
      id: 8,
      title: '1200W Titanium',
      category: 'Herramientas',
      badge: 'FUENTE DE ALIMENTACIÓN',
      description: 'Seasonic Prime TX-1200 · Modular completo',
      tags: ['1200W', '80+ Titanium', 'Modular'],
      price: '145,00€',
      image: 'https://placehold.co/280x180/0d1117/ffffff?text=PSU',
    },
  ],
}

const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        //activar
        setActiveCategory: (state, action) => {
            state.activeCategory = action.payload
        },
    },
})

//set para usarlo en dispatch
export const { setActiveCategory } = homeSlice.actions

//selector
export const selectActiveCategory = (state) => state.home.activeCategory

//selector pero para el filtro
export const selectFilteredProducts = (state) => {
  const { products, activeCategory } = state.home
  return activeCategory === 'Todos'
    ? products
    : products.filter((p) => p.category === activeCategory)
}

export default homeSlice.reducer