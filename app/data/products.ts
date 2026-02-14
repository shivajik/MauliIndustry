export interface SubProduct {
  name: string;
  description: string;
  specs?: Record<string, string>[];
}

export interface ProductCategory {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  subProducts?: SubProduct[];
  specs?: Record<string, string>[];
}

export const productCategories: ProductCategory[] = [
  {
    id: "shearing-blades",
    name: "Shearing Blades for Rolling Mill and Steel Plants",
    description:
      "Mauli Industries is the leader in Manufacturing of Shearing Blades, supplying across Pan India for two decades. Our customised solutions w.r.t design and product specification keep us ahead. Blades are heat treated with digitalised heat treatment process for better life and performance.",
    imageUrl: "/images/products/shearing-blades.jpg",
    specs: [
      { Particular: "Brand", Specifications: "Mauli" },
      { Particular: "Category", Specifications: "Shear Blade" },
      { Particular: "MOC", Specifications: "STD Alloy Tool Steel" },
      { Particular: "Shape", Specifications: "Rectangular" },
      { Particular: "Application", Specifications: "Hot Shearing Operations" },
      { Particular: "Variety", Specifications: "Customised" },
      { Particular: "Salient Feature", Specifications: "Precise Machined, Hardened, Certified" },
      { Particular: "Packaging Type", Specifications: "Wooden" },
      { Particular: "Supply", Specifications: "PAN India" },
    ],
    subProducts: [
      {
        name: "Shearing Blades - Billet and Bloom",
        description: "Mauli Shear blades is ultimate solution to the customer need. Our customised solutions w.r.t design and product specification keep us ahead. The selection of proper chemical composition yields optimal combination of hardness, toughness and sustainable product life.",
        specs: [
          { Particular: "Brand", Specifications: "Mauli" },
          { Particular: "Category", Specifications: "Shear Blade" },
          { Particular: "MOC", Specifications: "STD Alloy Tool Steel" },
          { Particular: "Application", Specifications: "Hot Shearing Operations" },
          { Particular: "Variety", Specifications: "Customised" },
          { Particular: "Salient Feature", Specifications: "Precise Machined, Hardened, Certified" },
        ],
      },
      {
        name: "Cold Shear Blades",
        description: "The top-notch design, development and research enable us to offer the wide range of solution in terms of shearing for different products like sheet metals, angles, channels etc. We offer onsite solution for the Standard or non-standard machines.",
        specs: [
          { Particular: "Brand", Specifications: "Mauli" },
          { Particular: "Category", Specifications: "Shearing Blades-Cold" },
          { Particular: "Material", Specifications: "STD-Alloy Steel" },
          { Particular: "Application", Specifications: "Cold Shearing Operation" },
          { Particular: "Variety", Specifications: "Rectangular" },
          { Particular: "Salient Features", Specifications: "Precise Machined, Hardened, Certified" },
        ],
      },
      {
        name: "End Length Shear Blades",
        description: "The top-notch design, development and research enable us to offer the wide range of solution in terms of shearing for different products like sheet metals, angles, channels etc.",
        specs: [
          { Particular: "Brand", Specifications: "Mauli" },
          { Particular: "Material", Specifications: "STD-Alloy Steel" },
          { Particular: "Application", Specifications: "Cold Shearing Operation" },
          { Particular: "Salient Features", Specifications: "Precise Machined, Hardened, Certified" },
        ],
      },
      {
        name: "Scrap Shear Blades",
        description: "Mauli Shear blades is ultimate solution to the customer need. Our customised solutions w.r.t design and product specification keep us ahead in the field.",
      },
      {
        name: "Bar/Wire Rod Shear Blades",
        description: "Our customised solutions w.r.t design and product specification keep us ahead. The selection of proper chemical composition yields optimal combination of hardness, toughness and sustainable product life.",
        specs: [
          { Particular: "Brand", Specifications: "Mauli" },
          { Particular: "MOC", Specifications: "STD Alloy Tool Steel" },
          { Particular: "Shape", Specifications: "Rectangular" },
        ],
      },
      {
        name: "Rotary Shear Blade",
        description: "High-performance rotary shear blades for continuous cutting operations. Heat treated with digitalised process for better life and performance.",
      },
      {
        name: "Flying Shear Blade",
        description: "Precision flying shear blades designed for high-speed cutting in rolling mills. Customised designs available.",
      },
      {
        name: "Continuous Shear Blade",
        description: "Blades designed for continuous shearing operations in rolling mills with sustained durability and performance.",
      },
      {
        name: "Dividing Shear Blade",
        description: "Specialized dividing shear blades for precision cutting of billets and blooms in steel plants.",
      },
      {
        name: "Crank Shear Blade",
        description: "Heavy-duty crank shear blades engineered for reliable and consistent shearing operations.",
      },
      {
        name: "CCM Shear Blade",
        description: "CCM shear blades designed for continuous casting machine applications with high temperature resistance.",
      },
      {
        name: "Angular Shear Blade",
        description: "Angular shear blades for angled cutting operations, available in customised designs and specifications.",
      },
      {
        name: "Chopping Shear Blade",
        description: "Chopping shear blades for scrap and billet chopping applications in rolling mills.",
      },
      {
        name: "Snap Shear Blade",
        description: "Snap shear blades for quick-action cutting operations in steel plants and rolling mills.",
      },
      {
        name: "Box Shear Blade",
        description: "Box type shear blades for heavy-duty shearing applications in steel rolling mills.",
      },
      {
        name: "PPRM Blade",
        description: "PPRM blades for specialized rolling mill applications with precision machining and hardening.",
      },
      {
        name: "Alligator Shear Blade",
        description: "Alligator shear blades for scrap cutting and recycling operations, built for durability.",
      },
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
    specs: [
      { Particular: "Brand", Specifications: "Mauli" },
      { Particular: "Category", Specifications: "Mill Stand" },
      { Particular: "MOC", Specifications: "MS or CI" },
      { Particular: "Application", Specifications: "Shearing Operations" },
      { Particular: "Variety", Specifications: "Customised" },
      { Particular: "Salient Feature", Specifications: "Precise Machined, Hardened, Certified" },
      { Particular: "Bearing", Specifications: "Spherical or Gun Bush" },
      { Particular: "Housing", Specifications: "Each Stands having Steel chocks" },
      { Particular: "Supply", Specifications: "PAN India" },
    ],
  },
  {
    id: "gear-couplings",
    name: "Gear Couplings",
    description:
      "Proper material selection, adequate design and precision manufacturing is the key to develop efficient gear couplings. Used for transmitting power from one shaft to another, handling radial and axial misalignment. We also provide Roller Guide Boxes, Twist Pipes, Roller Guide Box Reels and CI Guides.",
    imageUrl: "/images/products/gear-couplings.jpg",
    specs: [
      { Particular: "Brand", Specifications: "Mauli" },
      { Particular: "Category", Specifications: "Gear Coupling" },
      { Particular: "MOC", Specifications: "STD" },
      { Particular: "Alignment", Specifications: "Able to handle radial and axial misalignment" },
      { Particular: "Torque Capacity", Specifications: "Can be used for high torque" },
      { Particular: "Supply", Specifications: "PAN India" },
    ],
    subProducts: [
      {
        name: "Roller Entry Guide Box",
        description: "Guide box for roller is an integral part in rolling operation for rolling and twisting the stock in the adjacent set of rollers. Mauli Roller guide box gives you the credibility to attain the quality standard, durability and advances the smooth working operation.",
        specs: [
          { Particular: "Brand", Specifications: "Mauli" },
          { Particular: "Category", Specifications: "Roller Guide Box and Twist Pipe" },
          { Particular: "MOC", Specifications: "STD" },
          { Particular: "Application", Specifications: "Shearing Operations" },
          { Particular: "Alignment", Specifications: "Able to handle radial and axial misalignment" },
        ],
      },
      {
        name: "Roller Mill Entry Guide",
        description: "Precision roller mill entry guides designed for smooth stock entry into the rolling mill stands. Built for durability and consistent performance.",
        specs: [
          { Particular: "Brand", Specifications: "Mauli" },
          { Particular: "Category", Specifications: "Roller Guide Box" },
          { Particular: "MOC", Specifications: "STD" },
          { Particular: "Application", Specifications: "Rolling Operation" },
        ],
      },
      {
        name: "Roller Guide Boxes Without Holder",
        description: "Standalone roller guide boxes without holder for flexible integration into various rolling mill configurations.",
      },
      {
        name: "Entry Guiding Roller Boxes",
        description: "Entry guiding roller boxes for precise material guidance into rolling mill stands, ensuring quality output.",
      },
      {
        name: "SS Body Roller Guide Box",
        description: "Stainless steel body roller guide boxes offering superior corrosion resistance and extended service life in demanding environments.",
      },
      {
        name: "Industrial Roller Guide Box",
        description: "Heavy-duty industrial roller guide boxes built for high-volume rolling operations with maximum uptime.",
      },
      {
        name: "Roller Guide Box Reel",
        description: "We provide all types of guide box reel as per requirement. Specially designed reels for sustaining wear and tear conditions, durable and well suited to all your need.",
        specs: [
          { Particular: "Brand", Specifications: "Mauli" },
          { Particular: "Category", Specifications: "Roller Guide Box Reel" },
          { Particular: "Hardness", Specifications: "55-60 HRC" },
          { Particular: "Application", Specifications: "Roller Guide Box-Rolling Operation" },
          { Particular: "Supply", Specifications: "PAN India" },
        ],
      },
      {
        name: "CI Guides",
        description: "We provide different set of CI guides to fulfil the client needs. Cast iron guides for various rolling mill applications.",
        specs: [
          { Particular: "Brand", Specifications: "Mauli" },
          { Particular: "Category", Specifications: "CI Casting" },
          { Particular: "MOC", Specifications: "CI" },
          { Particular: "Application", Specifications: "Rolling Mill" },
          { Particular: "Supply", Specifications: "PAN India" },
        ],
      },
    ],
  },
  {
    id: "electro-hydraulic-grabber",
    name: "Electro Hydraulic Grabber",
    description:
      "The electro-hydraulic grabber is an attachment for elevation equipment run on electric supply, suitable for handling scraps, industrial and municipal waste. Available in models from MI-SG-50 (5T lift) to MI-SG-250 (16T lift) with operating pressure up to 200 Bar.",
    imageUrl: "/images/products/electro-hydraulic-grabber.jpg",
    specs: [
      { Particular: "Model MI-SG-50", Specifications: "Max Lift 5T, Volume 0.5m³, Motor 15kW, Pressure 180 Bar, 5 Shells" },
      { Particular: "Model MI-SG-100", Specifications: "Max Lift 8T, Volume 1m³, Motor 30kW, Pressure 200 Bar, 6 Shells" },
      { Particular: "Model MI-SG-125", Specifications: "Max Lift 8T, Volume 1.25m³, Motor 30kW, Pressure 200 Bar, 6 Shells" },
      { Particular: "Model MI-SG-150", Specifications: "Max Lift 10T, Volume 1.5m³, Motor 30kW, Pressure 200 Bar, 6 Shells" },
      { Particular: "Model MI-SG-200", Specifications: "Max Lift 12.5T, Volume 2m³, Motor 37kW, Pressure 200 Bar, 6 Shells" },
      { Particular: "Model MI-SG-250", Specifications: "Max Lift 16T, Volume 2.5m³, Motor 37kW, Pressure 200 Bar, 6 Shells" },
    ],
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
    specs: [
      { Particular: "Brand", Specifications: "Mauli" },
      { Particular: "Category", Specifications: "Bearing Chock" },
      { Particular: "MOC", Specifications: "Steel Casting EN-8, Steel Casting EN-9" },
      { Particular: "Application", Specifications: "Rolling Mill" },
      { Particular: "Variety", Specifications: "Customised" },
      { Particular: "Supply", Specifications: "PAN India" },
    ],
  },
  {
    id: "hydraulic-cylinders",
    name: "Hydraulic Cylinders",
    description:
      "Leading manufacturer of giant hydraulic cylinders for furnace, scrap grabbing, pusher applications in rolling mills. Capacity from 15 to 40 Tonnes. We also provide power packs, seals, spare parts and services for overhauling, maintenance and modification.",
    imageUrl: "/images/products/hydraulic-cylinders.jpg",
    specs: [
      { Particular: "Brand", Specifications: "Mauli" },
      { Particular: "Category", Specifications: "Hydraulic Cylinders" },
      { Particular: "MOC", Specifications: "STD" },
      { Particular: "Application", Specifications: "Rolling Mill" },
      { Particular: "Capacity", Specifications: "15 to 40 Tonnes" },
      { Particular: "Supply", Specifications: "PAN India" },
    ],
  },
  {
    id: "gear",
    name: "Gear",
    description:
      "Mauli Industries provides all types of gears to make the motion smooth and trouble free. We manufacture Worm and Worm Wheel, Bevel Gear (Spiral & Straight), Helical Gear, and Spur Gear with modules up to 16mm and diameters up to 1600mm.",
    imageUrl: "/images/products/gear.jpg",
    subProducts: [
      {
        name: "Worm and Worm Wheel",
        description: "Mauli Industries is the leading worm gear manufacturer, supplier and exporter in India. We never compromise in the quality aspect of worm gears. Worm gears are highly utilized in the manufacturing and packaging industries, conveying applications and small machineries.",
        specs: [
          { Particular: "Worms-Milled", Specifications: "Module: 1-16mm, Diameter: 5-1600mm" },
          { Particular: "Worms-Hardened & Ground", Specifications: "Module: 1-16mm, Diameter: 5-1600mm" },
          { Particular: "Worm Wheels", Specifications: "Module: 1-16mm, Diameter: 5-1600mm" },
        ],
      },
      {
        name: "Spiral Bevel Gear",
        description: "We are the leading Bevel gear manufacturer. Ground Spiral Bevel Gear, Hard Cut Spiral Bevel Gear, Lapped Spiral Bevel Gear available.",
        specs: [
          { Particular: "Normal Module", Specifications: "1-6mm" },
          { Particular: "Outside Diameter", Specifications: "20-280mm" },
        ],
      },
      {
        name: "Straight Bevel Gear",
        description: "High-quality straight bevel gears with precision manufacturing for smooth power transmission.",
        specs: [
          { Particular: "Normal Module", Specifications: "1-8mm" },
          { Particular: "Outside Diameter", Specifications: "12-300mm" },
        ],
      },
      {
        name: "Helical Gears - Hob Finish",
        description: "Our wide range and versatility to provide customized helical gear solutions. Hob finished for smooth operation.",
        specs: [
          { Particular: "Normal Module", Specifications: "1-16mm" },
          { Particular: "Outside Diameter", Specifications: "5-1600mm" },
        ],
      },
      {
        name: "Helical Gears - Hardened & Precision Ground",
        description: "Hardened and precision ground helical gears for demanding applications requiring high accuracy.",
        specs: [
          { Particular: "Normal Module", Specifications: "1-16mm" },
          { Particular: "Outside Diameter", Specifications: "5-1600mm" },
        ],
      },
      {
        name: "Spur Gear - Hob Finish",
        description: "Our wide range and versatility to provide customized spur gear solutions. Available in various modules.",
        specs: [
          { Particular: "Normal Module", Specifications: "0.5-16mm" },
          { Particular: "Outside Diameter", Specifications: "5-1600mm" },
        ],
      },
      {
        name: "Spur Gears - Hardened & Precision Ground",
        description: "Hardened and precision ground spur gears for high-performance applications.",
        specs: [
          { Particular: "Normal Module", Specifications: "0.5-16mm" },
          { Particular: "Outside Diameter", Specifications: "5-1600mm" },
        ],
      },
      {
        name: "Spur Gears - Shaped (External)",
        description: "Externally shaped spur gears manufactured with precision for reliable power transmission.",
        specs: [
          { Particular: "Normal Module", Specifications: "0.5-16mm" },
          { Particular: "Outside Diameter", Specifications: "5-1600mm" },
        ],
      },
      {
        name: "Spur Gears - Shaped (Internal)",
        description: "Internally shaped spur gears for specialized applications requiring internal gear configurations.",
        specs: [
          { Particular: "Normal Module", Specifications: "0.5-16mm" },
          { Particular: "Outside Diameter", Specifications: "5-1600mm" },
        ],
      },
    ],
  },
  {
    id: "chain-sprocket",
    name: "Chain Sprocket",
    description:
      "One of the bestseller products for different industrial applications. Manufactured with top-notch design, material and manufacturing expertise. Range includes single, double, triple strand, Quadruplex, taper lock, split, countershaft, conveyor, roll mill and ring sprockets.",
    imageUrl: "/images/products/chain-sprocket.jpg",
    specs: [
      { Particular: "Normal Pitch", Specifications: "5mm to 76mm" },
      { Particular: "Outside Diameter", Specifications: "10mm to 1200mm" },
    ],
  },
  {
    id: "timing-pulley",
    name: "Timing Pulley",
    description:
      "Precision manufacturing ensures smooth and silent functioning of the drive. Multiple material options including Steel, Aluminium and its alloys, CI, SS. Belt pulleys available from 10mm to 600mm outside diameter.",
    imageUrl: "/images/products/timing-pulley.jpg",
    specs: [
      { Particular: "Type", Specifications: "Timing Belt Pulleys" },
      { Particular: "Minimum Diameter", Specifications: "10mm" },
      { Particular: "Maximum Diameter", Specifications: "600mm" },
    ],
  },
  {
    id: "gear-coupling",
    name: "Gear Coupling",
    description:
      "Served multiple sectors in Pan India including Steel & Rolling Mill, Automotive, Tyre and Pharmaceutical industries. Full crowning gear couplings and sleeves available. ISO 9001-2015 quality standards maintained.",
    imageUrl: "/images/products/gear-coupling.jpg",
    specs: [
      { Particular: "Gear Coupling (Full Crowning)", Specifications: "Module: 1mm, Diameter: 10-500mm" },
      { Particular: "Gear Coupling Sleeves (I.D)", Specifications: "Module: 1mm, Diameter: 10-650mm" },
    ],
  },
  {
    id: "helical-gearbox-crane",
    name: "Helical Gearboxes for Cranes",
    description:
      "Leading supplier of helical gearboxes for cranes with 3 and 4 stages. Made from STD Alloy Steel and Case Hardened Steel, sizes up to 1200mm Central Distance, ratio up to 630:1.",
    imageUrl: "/images/products/helical-gearbox-crane.jpg",
    specs: [
      { Particular: "Brand", Specifications: "Mauli" },
      { Particular: "Stages", Specifications: "3 and 4" },
      { Particular: "MOC", Specifications: "STD Alloy Steel, Case Hardened Steel" },
      { Particular: "Sizes", Specifications: "Upto 1200mm Central Distance" },
      { Particular: "Salient Feature", Specifications: "Precise Machined, Hardened, Certified" },
      { Particular: "Ratio", Specifications: "630:1" },
      { Particular: "Supply", Specifications: "PAN India" },
    ],
  },
  {
    id: "parallel-shaft-gearbox",
    name: "Parallel Shaft Helical Gearboxes",
    description:
      "Top player among parallel shaft helical gearbox manufacturers. Available in single, two, three & four stages up to 630 CD at final stages.",
    imageUrl: "/images/products/parallel-shaft-gearbox.jpg",
    specs: [
      { Particular: "Brand", Specifications: "Mauli" },
      { Particular: "Stages", Specifications: "Single-Fourth Stage helical" },
      { Particular: "MOC", Specifications: "STD Alloy Steel, Case Hardened Steel" },
      { Particular: "Sizes", Specifications: "Upto 630mm CD" },
      { Particular: "Salient Feature", Specifications: "Precise Machined, Hardened, Certified" },
      { Particular: "Ratio", Specifications: "Upto 650:1" },
      { Particular: "Supply", Specifications: "PAN India" },
    ],
  },
  {
    id: "extruder-gearbox",
    name: "Extruder Duty Helical Gearboxes",
    description:
      "Heavy duty, durable and low-noise extruder gearboxes that accelerate efficiency and performance. Serving Iron & Steel, Food & Beverage, Pharmaceutical, Tyre industries.",
    imageUrl: "/images/products/extruder-gearbox.jpg",
    specs: [
      { Particular: "Brand", Specifications: "Mauli" },
      { Particular: "Stages", Specifications: "1 and 2 Stage helical" },
      { Particular: "MOC", Specifications: "STD Alloy Steel, Case Hardened Steel" },
      { Particular: "Sizes", Specifications: "Upto 630mm CD" },
      { Particular: "Salient Feature", Specifications: "Precise Machined, Hardened, Certified" },
      { Particular: "Ratio", Specifications: "Upto 6:1 to 22:1" },
      { Particular: "Supply", Specifications: "PAN India" },
    ],
  },
  {
    id: "custom-gearbox",
    name: "Custom-Made Gear Boxes",
    description:
      "Mauli Industries drives the best solutions in customised helical gearbox manufacturing in India. Wide range of customers in rolling mill, steel & power plants, pharmaceutical, automotive industries.",
    imageUrl: "/images/products/custom-gearbox.jpg",
  },
];
