import React from 'react';
import { remark } from 'remark';
function safeLink(value: string) { try { const u=new URL(value,'https://local.invalid'); return ['https:','http:','mailto:'].includes(u.protocol)?value:undefined; } catch { return undefined; } }
function render(node: any,key: number): React.ReactNode {
 const children=node.children?.map((n:any,i:number)=>render(n,i));
 switch(node.type) {
  case 'text': return node.value;
  case 'root': return <React.Fragment key={key}>{children}</React.Fragment>;
  case 'paragraph': return <p key={key}>{children}</p>;
  case 'heading': return React.createElement(`h${Math.min(6,Math.max(2,node.depth))}`,{key},children);
  case 'strong': return <strong key={key}>{children}</strong>;
  case 'emphasis': return <em key={key}>{children}</em>;
  case 'inlineCode': return <code key={key}>{node.value}</code>;
  case 'code': return <pre key={key} style={{overflowX:'auto'}}><code>{node.value}</code></pre>;
  case 'list': return node.ordered?<ol key={key}>{children}</ol>:<ul key={key}>{children}</ul>;
  case 'listItem': return <li key={key}>{children}</li>;
  case 'blockquote': return <blockquote key={key}>{children}</blockquote>;
  case 'link': return <a key={key} href={safeLink(node.url)} rel="noreferrer">{children}</a>;
  case 'break': return <br key={key}/>;
  case 'thematicBreak': return <hr key={key}/>;
  case 'html': return <span key={key}>{node.value}</span>;
  default: return <React.Fragment key={key}>{children}</React.Fragment>;
 }
}
export function ManagedContent({content,format='text'}:{content:string;format?:'text'|'markdown'}) {
 return <div style={{width:'100%',overflowWrap:'anywhere',lineHeight:1.8}}>{format==='markdown'?render(remark().parse(content),0):content.split(/\n\s*\n/).map((p,i)=><p key={i} style={{whiteSpace:'pre-wrap'}}>{p}</p>)}</div>;
}
