import { Article } from "../entity/Article";
import { AppDataSource } from "../data-source";

export class ArticleService {
  private articleRepository = AppDataSource.getRepository(Article);

  async getAllArticles(): Promise<Article[]> {
    return await this.articleRepository.find({ relations: ["user"] });
  }

  async getArticleById(id: number): Promise<Article | undefined> {
    const article = await this.articleRepository.findOne({ where: { id } });
    if (article) {
      await this.articleRepository.findOne({
        where: { id },
        relations: ["user"],
      });
    }
    return article;
  }

  async createArticle(articleData: Partial<Article>): Promise<Article> {
    const newArticle = this.articleRepository.create(articleData);
    return await this.articleRepository.save(newArticle);
  }

  async updateArticle(
    id: number,
    articleData: Partial<Article>
  ): Promise<Article | undefined> {
    const updatedArticle = { id, ...articleData };
    await this.articleRepository.save(updatedArticle);
    return await this.articleRepository.findOne({ where: { id } });
  }

  async deleteArticle(id: number): Promise<boolean> {
    const result = await this.articleRepository.delete(id);
    return result.affected !== 0;
  }
}
