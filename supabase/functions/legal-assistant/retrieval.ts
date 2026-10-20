export interface SourceArticle { slug: string; title: string; excerpt: string; content: string; date: string }
export function selectSources(articles: SourceArticle[], question: string) {
  const terms = question.toLowerCase().match(/[a-z]{4,}/g)?.filter(t => !["what", "does", "should", "would", "about", "kenya", "kenyan", "please", "have", "with", "that", "this", "firm"].includes(t)) ?? [];
  return articles.map(article => ({ article, score: terms.reduce((score, term) => score + (article.title.toLowerCase().includes(term) ? 5 : 0) + (article.excerpt.toLowerCase().includes(term) ? 3 : 0) + (article.content.toLowerCase().includes(term) ? 1 : 0), 0) })).filter(hit => hit.score > 0).sort((a,b) => b.score-a.score).slice(0, 5).map(hit => hit.article);
}