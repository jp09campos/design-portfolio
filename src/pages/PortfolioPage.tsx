import * as React from 'react';
import { Page } from '../components/ld/Page';
import { Container } from '../components/ld/Container';
import { Grid, GridColumn } from '../components/ld/Grid';
import { Button, ButtonGroup } from '../components/ld/Button';
import { Tag } from '../components/ld/Tag';
import { ContentCard } from '../components/ld/ContentCard';
import { Divider } from '../components/ld/Divider';
import { Image } from '../components/ld/Image';
import { Icon } from '../components/ld/Icons/Icons';
import { SectionHeader } from '../components/ld/SectionHeader';
import { Badge } from '../components/ld/Badge';

// ─── Portfolio Data ────────────────────────────────────────────────────────────
const OWNER = {
  name: 'JP Campos',
  role: 'Diseñadora UX/UI & Estratega de Producto',
  tagline:
    'Creo experiencias digitales significativas que combinan funcionalidad, accesibilidad y belleza visual.',
  bio1:
    'Soy diseñadora UX/UI apasionada por resolver problemas reales a través del diseño centrado en las personas. Mi trabajo combina investigación cualitativa, diseño visual y pensamiento estratégico.',
  bio2:
    'He colaborado en proyectos para Walmart México desarrollando aplicaciones móviles, sistemas de diseño y experiencias web accesibles a escala.',
  email: 'jp09campos@gmail.com',
  linkedin: 'https://linkedin.com/in/jp-campos',
};

const PROJECTS = [
  {
    id: 'ticket-digital',
    category: 'UX/UI Design · App Móvil',
    title: 'Walmart Ticket Digital',
    description:
      'App móvil para gestión de tickets de garantía y soporte al cliente, con enfoque en accesibilidad y usabilidad para millones de usuarios en México.',
    image:
      'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=700&q=80',
    imageAlt:
      'Dispositivos móviles mostrando la interfaz de la app Walmart Ticket Digital con pantallas de gestión de garantías',
    ctaLabel: 'Ver caso de estudio',
    ctaHref: '#',
  },
  {
    id: 'design-system',
    category: 'Design Systems · Web',
    title: 'Sistema de Diseño Empresarial',
    description:
      'Sistema de diseño completo con más de 150 componentes, tokens de diseño y documentación exhaustiva para plataforma B2B.',
    image:
      'https://images.unsplash.com/photo-1558655146-d09347e92766?w=700&q=80',
    imageAlt:
      'Pantalla mostrando componentes del sistema de diseño con guías de estilo y especificaciones visuales',
    ctaLabel: 'Ver proyecto',
    ctaHref: '#',
  },
  {
    id: 'ecommerce-redesign',
    category: 'UX Research · Web',
    title: 'Rediseño E-commerce',
    description:
      'Investigación y rediseño de la experiencia de compra con foco en conversión, accesibilidad y satisfacción del usuario.',
    image:
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=700&q=80',
    imageAlt:
      'Interfaz rediseñada de plataforma e-commerce mostrando página de producto optimizada para conversión',
    ctaLabel: 'Ver caso de estudio',
    ctaHref: '#',
  },
];

const SKILLS = [
  'UX Research',
  'UI Design',
  'Prototyping',
  'Wireframing',
  'Design Systems',
  'Design Thinking',
  'User Testing',
  'A/B Testing',
  'Figma',
  'Adobe XD',
  'Living Design',
  'Accesibilidad (WCAG 2.2)',
  'React',
  'TypeScript',
  'CSS / Tailwind',
];

const STATS = [
  {
    icon: 'Clock',
    label: 'Experiencia',
    value: '5+ años en diseño de productos digitales',
  },
  {
    icon: 'CheckCircleFill',
    label: 'Proyectos',
    value: '30+ proyectos UX/UI completados exitosamente',
  },
  {
    icon: 'Users',
    label: 'Equipos',
    value: 'Colaboración con equipos multidisciplinarios',
  },
  {
    icon: 'Star',
    label: 'Enfoque',
    value: 'Accesibilidad, usabilidad y estética visual',
  },
];

// ─── Portfolio Page ────────────────────────────────────────────────────────────
export default function PortfolioPage() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <Page title="JP Campos | Portafolio de Diseño UX/UI" titleVisuallyHidden>
      {/* ── STICKY NAVIGATION ─────────────────────────────────────────── */}
      <nav
        aria-label="Navegación principal"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        }}
      >
        <Container>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 0',
              flexWrap: 'wrap',
              gap: 8,
            }}
          >
            <Button variant="tertiary" onClick={() => scrollTo('hero')}>
              JP Campos
            </Button>
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              <Button
                variant="tertiary"
                size="small"
                onClick={() => scrollTo('projects')}
              >
                Proyectos
              </Button>
              <Button
                variant="tertiary"
                size="small"
                onClick={() => scrollTo('about')}
              >
                Sobre mí
              </Button>
              <Button
                variant="tertiary"
                size="small"
                onClick={() => scrollTo('skills')}
              >
                Habilidades
              </Button>
              <Button
                variant="tertiary"
                size="small"
                onClick={() => scrollTo('contact')}
              >
                Contacto
              </Button>
            </div>
          </div>
        </Container>
      </nav>

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section
        id="hero"
        aria-labelledby="hero-heading"
        style={{
          minHeight: '100vh',
          background:
            'linear-gradient(135deg, #0053e2 0%, #001e60 60%, #000a2e 100%)',
          display: 'flex',
          alignItems: 'center',
          padding: '80px 0',
        }}
      >
        <Container>
          <div style={{ textAlign: 'center', color: '#ffffff' }}>
            {/* Status badge */}
            <div style={{ marginBottom: 24 }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '6px 18px',
                  borderRadius: 100,
                  backgroundColor: 'rgba(255, 194, 32, 0.15)',
                  border: '1px solid rgba(255, 194, 32, 0.4)',
                  color: '#ffc220',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                }}
              >
                <Icon
                  name="Star"
                  decorative
                  style={{ fontSize: '0.875rem' }}
                />
                Disponible para nuevos proyectos
              </span>
            </div>

            {/* Name — visible h2 (Page h1 is hidden via titleVisuallyHidden) */}
            <h2
              id="hero-heading"
              style={{
                fontSize: 'clamp(2.5rem, 8vw, 5.5rem)',
                fontWeight: 800,
                margin: '0 0 16px',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                color: '#ffffff',
              }}
            >
              {OWNER.name}
            </h2>

            <p
              style={{
                fontSize: 'clamp(1.1rem, 3vw, 1.5rem)',
                fontWeight: 400,
                margin: '0 0 24px',
                color: 'rgba(255, 255, 255, 0.8)',
              }}
            >
              {OWNER.role}
            </p>

            <p
              style={{
                fontSize: 'clamp(0.95rem, 2vw, 1.125rem)',
                maxWidth: 580,
                margin: '0 auto 48px',
                color: 'rgba(255, 255, 255, 0.6)',
                lineHeight: 1.8,
              }}
            >
              {OWNER.tagline}
            </p>

            <ButtonGroup>
              <Button
                variant="primary"
                size="medium"
                onClick={() => scrollTo('projects')}
              >
                Ver mi trabajo
              </Button>
              <Button
                variant="secondary"
                size="medium"
                onClick={() => scrollTo('contact')}
              >
                Contáctame
              </Button>
            </ButtonGroup>
          </div>
        </Container>
      </section>

      {/* ── PROJECTS ──────────────────────────────────────────────────── */}
      <section
        id="projects"
        aria-label="Proyectos destacados"
        style={{ padding: '80px 0' }}
      >
        <Container>
          <SectionHeader
            title="Proyectos destacados"
            subtitle="Una selección de mi trabajo reciente en diseño UX/UI y estrategia de producto."
            headingLevel="h2"
          />
          <Grid hasGutter>
            {PROJECTS.map((project) => (
              <GridColumn key={project.id} sm={12} md={6} lg={4}>
                <ContentCard
                  variant="vertical"
                  imageSrc={project.image}
                  imageAlt={project.imageAlt}
                  eyebrow={project.category}
                  headline={project.title}
                  subtext={project.description}
                  ctaLabel={project.ctaLabel}
                  ctaHref={project.ctaHref}
                />
              </GridColumn>
            ))}
          </Grid>
        </Container>
      </section>

      <div style={{ margin: '0 0 0 0' }}>
        <Divider />
      </div>

      {/* ── ABOUT ─────────────────────────────────────────────────────── */}
      <section
        id="about"
        aria-labelledby="about-heading"
        style={{ backgroundColor: '#f8f9fa', padding: '80px 0' }}
      >
        <Container>
          <Grid hasGutter>
            {/* Text column */}
            <GridColumn sm={12} md={6} lg={6}>
              <h2
                id="about-heading"
                style={{
                  fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                  fontWeight: 700,
                  color: '#001e60',
                  margin: '0 0 24px',
                  lineHeight: 1.2,
                }}
              >
                Sobre mí
              </h2>
              <p
                style={{
                  fontSize: '1.05rem',
                  lineHeight: 1.85,
                  color: '#444',
                  marginBottom: 16,
                }}
              >
                {OWNER.bio1}
              </p>
              <p
                style={{
                  fontSize: '1.05rem',
                  lineHeight: 1.85,
                  color: '#444',
                  marginBottom: 32,
                }}
              >
                {OWNER.bio2}
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Button
                  variant="primary"
                  size="medium"
                  href={`mailto:${OWNER.email}`}
                  leading={<Icon name="Email" decorative />}
                >
                  Enviar Email
                </Button>
                <Button
                  variant="secondary"
                  size="medium"
                  href={OWNER.linkedin}
                >
                  Ver LinkedIn
                </Button>
              </div>
            </GridColumn>

            {/* Stats column */}
            <GridColumn sm={12} md={6} lg={6}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                  paddingTop: 8,
                }}
              >
                {STATS.map((stat) => (
                  <div
                    key={stat.label}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 16,
                      padding: '20px 24px',
                      backgroundColor: '#ffffff',
                      borderRadius: 12,
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                      border: '1px solid rgba(0, 0, 0, 0.05)',
                    }}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: '50%',
                        backgroundColor: '#0053e2',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Icon
                        name={stat.icon}
                        decorative
                        style={{ color: '#ffffff', fontSize: '1.2rem' }}
                      />
                    </div>
                    <div>
                      <p
                        style={{
                          fontWeight: 700,
                          margin: '0 0 4px',
                          color: '#001e60',
                          fontSize: '0.9rem',
                        }}
                      >
                        {stat.label}
                      </p>
                      <p
                        style={{
                          margin: 0,
                          color: '#666',
                          fontSize: '0.9rem',
                          lineHeight: 1.5,
                        }}
                      >
                        {stat.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </GridColumn>
          </Grid>
        </Container>
      </section>

      <div style={{ margin: 0 }}>
        <Divider />
      </div>

      {/* ── SKILLS ────────────────────────────────────────────────────── */}
      <section
        id="skills"
        aria-label="Habilidades y herramientas"
        style={{ padding: '80px 0' }}
      >
        <Container>
          <SectionHeader
            title="Habilidades y herramientas"
            subtitle="Las competencias y tecnologías que domino para crear experiencias digitales de calidad."
            headingLevel="h2"
          />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            {SKILLS.map((skill) => (
              <Tag key={skill} color="neutral" variant="secondary">
                {skill}
              </Tag>
            ))}
          </div>
        </Container>
      </section>

      <div style={{ margin: 0 }}>
        <Divider />
      </div>

      {/* ── CONTACT ───────────────────────────────────────────────────── */}
      <section
        id="contact"
        aria-labelledby="contact-heading"
        style={{
          background:
            'linear-gradient(135deg, #001e60 0%, #0053e2 100%)',
          padding: '80px 0',
        }}
      >
        <Container>
          <div style={{ textAlign: 'center', color: '#ffffff' }}>
            <h2
              id="contact-heading"
              style={{
                fontSize: 'clamp(1.75rem, 4vw, 3rem)',
                fontWeight: 700,
                margin: '0 0 16px',
                color: '#ffffff',
                lineHeight: 1.2,
              }}
            >
              Trabajemos juntos
            </h2>
            <p
              style={{
                fontSize: '1.1rem',
                maxWidth: 520,
                margin: '0 auto 48px',
                color: 'rgba(255, 255, 255, 0.7)',
                lineHeight: 1.8,
              }}
            >
              ¿Tienes un proyecto en mente? Me encantaría conocer más y explorar
              cómo podemos crear experiencias digitales excepcionales juntos.
            </p>
            <div
              style={{
                display: 'flex',
                gap: 16,
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              <Button
                variant="primary"
                size="medium"
                href={`mailto:${OWNER.email}`}
                leading={<Icon name="Email" decorative />}
              >
                Enviar Email
              </Button>
              <Button
                variant="secondary"
                size="medium"
                href={OWNER.linkedin}
                leading={<Icon name="LinkExternal" decorative />}
              >
                Ver LinkedIn
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────── */}
      <footer
        style={{
          backgroundColor: '#000a2e',
          padding: '32px 0',
          textAlign: 'center',
        }}
      >
        <Container>
          <p
            style={{
              color: 'rgba(255, 255, 255, 0.4)',
              margin: 0,
              fontSize: '0.875rem',
            }}
          >
            &copy; {new Date().getFullYear()} JP Campos &mdash; Diseñadora UX/UI
          </p>
        </Container>
      </footer>
    </Page>
  );
}
