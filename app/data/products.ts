export interface ProductCategory {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  subProducts?: string[];
}

export const productCategories: ProductCategory[] = [
  {
    id: "shearing-blades",
    name: "Shearing Blades for Rolling Mill and Steel Plants",
    description:
      "Mauli Industries is the leader in Manufacturing of Shearing Blades, supplying across Pan India for two decades. Our customised solutions w.r.t design and product specification keep us ahead. Blades are heat treated with digitalised heat treatment process for better life and performance.",
    imageUrl: "/images/products/shearing-blades.jpg",
    subProducts: [
      "Shearing Blades - Billet and Bloom",
      "Cold Shear Blades",
      "End Length Shear Blades",
      "Scrap Shear Blades",
      "Bar/Wire Rod Shear Blades",
      "Rotary Shear Blade",
      "Flying Shear Blade",
      "Continuous Shear Blade",
      "Dividing Shear Blade",
      "Crank Shear Blade",
      "CCM Shear Blade",
      "Angular Shear Blade",
      "Chopping Shear Blade",
      "Snap Shear Blade",
      "Box Shear Blade",
      "PPRM Blade",
      "Alligator Shear Blade",
    ],
  },
  {
    id: "pinch-roll",
    name: "Pinch Roll and Tail Breaker",
    description:
      "Mauli is pioneer in manufacturing spare parts and machineries for rolling mills since 20 years. We produce high-speed pinch rolls and tail breakers to produce consistent tension of the bar with innovative approach for best performance and durability.",
    imageUrl: "/images/products/pinch-roll.jpg",
  },
  {
    id: "mill-stands",
    name: "Mill Stands",
    description:
      "We are leading manufacturer of complete set of mill stands for the rolling industry of ferrous and non-ferrous metals. Our mill stands feature precise machining, hardened components, spherical or gun bush bearings, and steel chocks housing.",
    imageUrl: "/images/products/mill-stands.jpg",
  },
  {
    id: "gear-couplings",
    name: "Gear Couplings",
    description:
      "Proper material selection, adequate design and precision manufacturing is the key to develop efficient gear couplings. Used for transmitting power from one shaft to another, handling radial and axial misalignment. We also provide Roller Guide Boxes, Twist Pipes, Roller Guide Box Reels and CI Guides.",
    imageUrl: "/images/products/gear-couplings.jpg",
    subProducts: [
      "Roller Entry Guide Box",
      "Roller Mill Entry Guide",
      "Roller Guide Boxes Without Holder",
      "Entry Guiding Roller Boxes",
      "SS Body Roller Guide Box",
      "Industrial Roller Guide Box",
      "Roller Guide Box Reel",
      "CI Guides",
    ],
  },
  {
    id: "electro-hydraulic-grabber",
    name: "Electro Hydraulic Grabber",
    description:
      "The electro-hydraulic grabber is an attachment for elevation equipment run on electric supply, suitable for handling scraps, industrial and municipal waste. Available in models from MI-SG-50 (5T lift) to MI-SG-250 (16T lift) with operating pressure up to 200 Bar.",
    imageUrl: "/images/products/electro-hydraulic-grabber.jpg",
  },
  {
    id: "cold-shear-machine",
    name: "Cold Shear Machine",
    description:
      "One of the most popular products of Mauli Industries. Our R&D experts and professional machinists deliver best-in-class machines for efficient operation, durability and long life.",
    imageUrl: "/images/products/cold-shear-machine.jpg",
  },
  {
    id: "bearing-chokes",
    name: "Bearing Chokes",
    description:
      "To avoid resistive forces and ensure smooth rotational flow, bearing chocks (housing) are mounted on roll stands. Made from Steel Casting EN-8 and EN-9, we provide all kinds of bearing chocks for rolling mill applications.",
    imageUrl: "/images/products/bearing-chokes.jpg",
  },
  {
    id: "hydraulic-cylinders",
    name: "Hydraulic Cylinders",
    description:
      "Leading manufacturer of giant hydraulic cylinders for furnace, scrap grabbing, pusher applications in rolling mills. Capacity from 15 to 40 Tonnes. We also provide power packs, seals, spare parts and services for overhauling, maintenance and modification.",
    imageUrl: "/images/products/hydraulic-cylinders.jpg",
  },
  {
    id: "gear",
    name: "Gear",
    description:
      "Mauli Industries provides all types of gears to make the motion smooth and trouble free. We manufacture Worm and Worm Wheel, Bevel Gear (Spiral & Straight), Helical Gear, and Spur Gear with modules up to 16mm and diameters up to 1600mm.",
    imageUrl: "/images/products/gear.jpg",
    subProducts: [
      "Worm and Worm Wheel",
      "Spiral Bevel Gear",
      "Straight Bevel Gear",
      "Helical Gears - Hob Finish",
      "Helical Gears - Hardened & Precision Ground",
      "Spur Gear - Hob Finish",
      "Spur Gears - Hardened & Precision Ground",
      "Spur Gears - Shaped (External)",
      "Spur Gears - Shaped (Internal)",
    ],
  },
  {
    id: "chain-sprocket",
    name: "Chain Sprocket",
    description:
      "One of the bestseller products for different industrial applications. Manufactured with top-notch design, material and manufacturing expertise. Range includes single, double, triple strand, Quadruplex, taper lock, split, countershaft, conveyor, roll mill and ring sprockets.",
    imageUrl: "/images/products/chain-sprocket.jpg",
  },
  {
    id: "timing-pulley",
    name: "Timing Pulley",
    description:
      "Precision manufacturing ensures smooth and silent functioning of the drive. Multiple material options including Steel, Aluminium and its alloys, CI, SS. Belt pulleys available from 10mm to 600mm outside diameter.",
    imageUrl: "/images/products/timing-pulley.jpg",
  },
  {
    id: "gear-coupling",
    name: "Gear Coupling",
    description:
      "Served multiple sectors in Pan India including Steel & Rolling Mill, Automotive, Tyre and Pharmaceutical industries. Full crowning gear couplings and sleeves available. Can couple different power transmission parts, enhance efficiency and accommodate misalignment. ISO 9001-2015 quality standards maintained.",
    imageUrl: "/images/products/gear-coupling.jpg",
  },
  {
    id: "helical-gearbox-crane",
    name: "Helical Gearboxes for Cranes",
    description:
      "Leading supplier of helical gearboxes for cranes with 3 and 4 stages. Made from STD Alloy Steel and Case Hardened Steel, sizes up to 1200mm Central Distance, ratio up to 630:1. Precise Machined, Hardened and Certified.",
    imageUrl: "/images/products/helical-gearbox-crane.jpg",
  },
  {
    id: "parallel-shaft-gearbox",
    name: "Parallel Shaft Helical Gearboxes",
    description:
      "Top player among parallel shaft helical gearbox manufacturers. Available in single, two, three & four stages up to 630 CD at final stages. Made from STD Alloy Steel, Case Hardened Steel with ratio up to 650:1.",
    imageUrl: "/images/products/parallel-shaft-gearbox.jpg",
  },
  {
    id: "extruder-gearbox",
    name: "Extruder Duty Helical Gearboxes",
    description:
      "Heavy duty, durable and low-noise extruder gearboxes that accelerate efficiency and performance. 1 and 2 stage helical, sizes up to 630mm CD, ratio 6:1 to 22:1. Serving Iron & Steel, Food & Beverage, Pharmaceutical, Tyre industries.",
    imageUrl: "/images/products/extruder-gearbox.jpg",
  },
  {
    id: "custom-gearbox",
    name: "Custom-Made Gear Boxes",
    description:
      "Mauli Industries drives the best solutions in customised helical gearbox manufacturing in India. Wide range of customers in rolling mill, steel & power plants, pharmaceutical, automotive industries. First choice in the region for gearbox supply and service.",
    imageUrl: "/images/products/custom-gearbox.jpg",
  },
];
