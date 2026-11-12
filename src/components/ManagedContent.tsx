// Admin-authored text is rendered as text, never executed as MDX/JavaScript.
export function ManagedContent({ content }: { content: string }) {
 return <div style={{ width: '100%', overflowWrap: 'anywhere', lineHeight: 1.8 }}>{content.split(/\n\s*\n/).map((paragraph, i) => <p key={i} style={{ whiteSpace: 'pre-wrap', margin: '0 0 1.25em' }}>{paragraph}</p>)}</div>;
}
