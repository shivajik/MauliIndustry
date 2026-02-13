import type { Route } from "./+types/services";
import { Header } from "~/components/header/header";
import { Footer } from "~/components/footer/footer";
import { Wrench, Settings, Cpu, Truck, PipetteIcon, Shield, Factory, HardHat } from "lucide-react";
import styles from "./services.module.css";

const services = [
  {
    icon: Factory,
    title: "All Types of Fabrication",
    description: "Heavy, light and customized fabrication with precision workmanship for industrial applications.",
  },
  {
    icon: Wrench,
    title: "Machine Maintenance (On-Site & Off-Site)",
    description: "Breakdown, preventive and scheduled maintenance to minimize downtime and ensure peak performance.",
  },
  {
    icon: Cpu,
    title: "Process Automation",
    description: "Smart automation solutions designed to improve safety, speed and output across your operations.",
  },
  {
    icon: Truck,
    title: "Plant Shifting Solutions",
    description: "Safe dismantling, relocation, alignment, and re-commissioning of industrial plants and machinery.",
  },
  {
    icon: PipetteIcon,
    title: "Industrial Pipelines",
    description: "Design, fabrication and installation of process and utility pipelines for all industrial needs.",
  },
  {
    icon: Shield,
    title: "Carbide Coating",
    description: "Advanced wear-resistant coating solutions for longer component life and reduced maintenance costs.",
  },
  {
    icon: Settings,
    title: "Advance Tool Room Services",
    description: "CNC & Conventional Turning, Milling & VMC, Gear Hobbing, Grinding, Precision Machining.",
  },
  {
    icon: HardHat,
    title: "Installation & Commissioning",
    description: "All kinds of installation, commissioning & erection works for industrial machinery and plants.",
  },
];

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Our Services - Mauli Industries" },
    {
      name: "description",
      content: "End-to-end engineering and industrial services including fabrication, maintenance, automation, and more.",
    },
  ];
}

export default function Services() {
  return (
    <div className={styles.container}>
      <Header />

      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>OUR SERVICES</h1>
        <p className={styles.heroSubtitle}>End-to-End Solutions for Every Industrial Need</p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Engineering & Industrial Services</h2>
        <p className={styles.sectionSubtitle}>
          From fabrication to commissioning, we provide comprehensive industrial services backed by 20+ years of expertise.
        </p>

        <div className={styles.servicesGrid}>
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div key={index} className={styles.serviceCard}>
                <div className={styles.serviceIconWrapper}>
                  <IconComponent size={32} className={styles.serviceIcon} />
                </div>
                <h3 className={styles.serviceTitle}>{service.title}</h3>
                <p className={styles.serviceDescription}>{service.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
}
