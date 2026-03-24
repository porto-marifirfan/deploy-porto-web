const pickFirst = (...values) => values.find((value) => value !== undefined && value !== null);

const parseArrayField = (value) => {
  if (Array.isArray(value)) return value;
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed) return [];

    if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
      try {
        const parsed = JSON.parse(trimmed);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }

    return trimmed
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
};

export const normalizeProject = (project = {}) => ({
  ...project,
  Title: pickFirst(project.Title, project.title, ''),
  Description: pickFirst(project.Description, project.description, ''),
  Img: pickFirst(project.Img, project.img, ''),
  Link: pickFirst(project.Link, project.link, ''),
  Github: pickFirst(project.Github, project.github, ''),
  Features: parseArrayField(pickFirst(project.Features, project.features, [])),
  TechStack: parseArrayField(pickFirst(project.TechStack, project.tech_stack, [])),
});

export const normalizeCertificate = (certificate = {}) => ({
  ...certificate,
  Img: pickFirst(certificate.Img, certificate.img, ''),
});

export const normalizeDesign = (design = {}) => ({
  ...design,
  Img: pickFirst(design.Img, design.img, ''),
});

export const projectPayload = ({ Title, Description, Link, Github, Features, TechStack, Img = '' }) => ({
  title: Title,
  description: Description,
  img: Img,
  link: Link,
  github: Github,
  features: parseArrayField(Features),
  tech_stack: parseArrayField(TechStack),
});

export const certificatePayload = (img) => ({
  img,
});

export const designPayload = (img) => ({
  img,
});

export const createStorageFileName = (prefix, file) => {
  const ext = file?.name?.split('.').pop()?.toLowerCase() || 'jpg';
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}.${ext}`;
};
