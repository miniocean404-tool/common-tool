interface Article {
  title: string
  content: string
  author: string
}

type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

type ArticlePreview = Optional<Article, "content" | "title">

const preview: ArticlePreview = {
  author: "",
}
