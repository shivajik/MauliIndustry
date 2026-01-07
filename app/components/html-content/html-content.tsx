import { sanitizeHtml } from '~/utils/html-utils';

interface HtmlContentProps {
  html: string;
  className?: string;
}

/**
 * Renders sanitized HTML content
 * Use this component to display content from the rich text editor
 */
export function HtmlContent({ html, className }: HtmlContentProps) {
  const sanitized = sanitizeHtml(html);
  
  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  );
}
