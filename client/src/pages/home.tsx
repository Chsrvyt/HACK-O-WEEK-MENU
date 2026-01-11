import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  isVeg: boolean;
}

interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

const menuData: MenuCategory[] = [
  {
    id: "starters",
    name: "Starters",
    items: [
      { id: "s1", name: "Paneer Tikka", description: "Marinated cottage cheese grilled to perfection with spices", price: 280, isVeg: true },
      { id: "s2", name: "Chicken Seekh Kebab", description: "Minced chicken skewers with aromatic herbs and spices", price: 320, isVeg: false },
      { id: "s3", name: "Vegetable Samosa", description: "Crispy pastry filled with spiced potatoes and peas", price: 120, isVeg: true },
      { id: "s4", name: "Tandoori Prawns", description: "Jumbo prawns marinated in yogurt and tandoori spices", price: 450, isVeg: false },
      { id: "s5", name: "Hara Bhara Kebab", description: "Spinach and green pea patties with mint chutney", price: 220, isVeg: true },
      { id: "s6", name: "Mutton Galouti", description: "Melt-in-mouth minced mutton kebabs from Lucknow", price: 380, isVeg: false },
    ],
  },
  {
    id: "main-course",
    name: "Main Course",
    items: [
      { id: "m1", name: "Butter Chicken", description: "Tender chicken in rich tomato and butter gravy", price: 380, isVeg: false },
      { id: "m2", name: "Dal Makhani", description: "Slow-cooked black lentils with cream and butter", price: 280, isVeg: true },
      { id: "m3", name: "Palak Paneer", description: "Cottage cheese cubes in creamy spinach gravy", price: 300, isVeg: true },
      { id: "m4", name: "Lamb Rogan Josh", description: "Kashmiri style lamb curry with aromatic spices", price: 450, isVeg: false },
      { id: "m5", name: "Hyderabadi Biryani", description: "Fragrant basmati rice layered with spiced chicken", price: 360, isVeg: false },
      { id: "m6", name: "Paneer Butter Masala", description: "Cottage cheese in velvety tomato cashew gravy", price: 320, isVeg: true },
      { id: "m7", name: "Fish Curry", description: "Fresh fish cooked in coastal style coconut curry", price: 420, isVeg: false },
      { id: "m8", name: "Malai Kofta", description: "Stuffed potato dumplings in creamy cashew gravy", price: 340, isVeg: true },
    ],
  },
  {
    id: "beverages",
    name: "Beverages",
    items: [
      { id: "b1", name: "Mango Lassi", description: "Creamy yogurt shake blended with alphonso mangoes", price: 120, isVeg: true },
      { id: "b2", name: "Masala Chai", description: "Traditional spiced tea with cardamom and ginger", price: 60, isVeg: true },
      { id: "b3", name: "Sweet Lassi", description: "Refreshing churned yogurt drink with rose water", price: 90, isVeg: true },
      { id: "b4", name: "Fresh Lime Soda", description: "Zesty lime with soda, salt or sweet", price: 80, isVeg: true },
      { id: "b5", name: "Jaljeera", description: "Tangy cumin water with mint and spices", price: 70, isVeg: true },
    ],
  },
  {
    id: "desserts",
    name: "Desserts",
    items: [
      { id: "d1", name: "Gulab Jamun", description: "Soft milk dumplings soaked in rose sugar syrup", price: 120, isVeg: true },
      { id: "d2", name: "Rasmalai", description: "Cottage cheese patties in saffron cardamom milk", price: 150, isVeg: true },
      { id: "d3", name: "Kulfi Falooda", description: "Traditional Indian ice cream with vermicelli", price: 180, isVeg: true },
      { id: "d4", name: "Gajar Halwa", description: "Warm carrot pudding with nuts and khoya", price: 140, isVeg: true },
      { id: "d5", name: "Phirni", description: "Creamy ground rice pudding with pistachios", price: 130, isVeg: true },
    ],
  },
];

function VegIndicator({ isVeg }: { isVeg: boolean }) {
  return (
    <div 
      className={isVeg ? "veg-indicator" : "nonveg-indicator"} 
      title={isVeg ? "Vegetarian" : "Non-Vegetarian"}
      data-testid={`indicator-${isVeg ? "veg" : "nonveg"}`}
    />
  );
}

function MenuCard({ item }: { item: MenuItem }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.3 }}
      className="menu-card bg-card rounded-xl p-4 border border-[hsl(30_15%_88%)] shadow-sm"
      data-testid={`menu-card-${item.id}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <VegIndicator isVeg={item.isVeg} />
            <h3 className="font-semibold text-foreground text-base leading-tight" data-testid={`item-name-${item.id}`}>
              {item.name}
            </h3>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2" data-testid={`item-desc-${item.id}`}>
            {item.description}
          </p>
        </div>
        <div className="flex-shrink-0">
          <span className="font-display font-semibold text-primary text-lg" data-testid={`item-price-${item.id}`}>
            ₹{item.price}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function CategoryNav({ 
  categories, 
  activeCategory, 
  onCategoryClick 
}: { 
  categories: MenuCategory[]; 
  activeCategory: string;
  onCategoryClick: (id: string) => void;
}) {
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (navRef.current) {
      const activeBtn = navRef.current.querySelector(`[data-category="${activeCategory}"]`);
      if (activeBtn) {
        activeBtn.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    }
  }, [activeCategory]);

  return (
    <div 
      ref={navRef}
      className="category-nav flex gap-2 overflow-x-auto px-4 py-3 bg-background/95 backdrop-blur-sm"
    >
      {categories.map((category) => (
        <button
          key={category.id}
          data-category={category.id}
          onClick={() => onCategoryClick(category.id)}
          className={`category-btn flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeCategory === category.id 
              ? "active" 
              : "text-foreground bg-secondary hover:bg-primary/10"
          }`}
          data-testid={`nav-${category.id}`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState(menuData[0].id);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-120px 0px -60% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveCategory(entry.target.id);
        }
      });
    }, observerOptions);

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const handleCategoryClick = (categoryId: string) => {
    const section = sectionRefs.current[categoryId];
    if (section) {
      const headerOffset = 120;
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="px-4 py-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-2xl md:text-3xl font-bold text-foreground tracking-tight"
            data-testid="restaurant-name"
          >
            Saffron Kitchen
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-sm mt-1"
            data-testid="restaurant-tagline"
          >
            Authentic Flavors, Timeless Traditions
          </motion.p>
        </div>
        <CategoryNav 
          categories={menuData} 
          activeCategory={activeCategory}
          onCategoryClick={handleCategoryClick}
        />
      </header>

      <main className="px-4 py-6 max-w-2xl mx-auto pb-20">
        {menuData.map((category) => (
          <section
            key={category.id}
            id={category.id}
            ref={(el) => { sectionRefs.current[category.id] = el; }}
            className="mb-10"
            data-testid={`section-${category.id}`}
          >
            <div className="flex items-center gap-3 mb-4">
              <h2 className="font-display text-xl md:text-2xl font-semibold text-foreground">
                {category.name}
              </h2>
              <div className="flex-1 h-px bg-border" />
              <span className="text-muted-foreground text-sm">
                {category.items.length} items
              </span>
            </div>
            <div className="grid gap-3">
              {category.items.map((item) => (
                <MenuCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        ))}
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border py-3 px-4 text-center">
        <p className="text-muted-foreground text-xs">
          All prices inclusive of taxes • Menu items subject to availability
        </p>
      </footer>
    </div>
  );
}
