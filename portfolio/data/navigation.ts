export interface NavItem {
  label: string
  href: string
  /** Short mono label used by the floating rail on large screens */
  short: string
}

export const navItems: NavItem[] = [
  { label: 'About', href: '#about', short: 'about' },
  { label: 'Skills', href: '#skills', short: 'skills' },
  { label: 'Projects', href: '#projects', short: 'work' },
  { label: 'Experience', href: '#experience', short: 'exp' },
  { label: 'Expertise', href: '#expertise', short: 'ai' },
  { label: 'GitHub', href: '#github', short: 'code' },
  { label: 'Contact', href: '#contact', short: 'hire' },
]
