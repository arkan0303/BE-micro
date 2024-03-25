import { Request, Response } from "express";
import { ArticleService } from "../services/ArticleService";
import upload from "../midleware/multer";
import { File } from "multer";

const articleService = new ArticleService();

export default class ArticleControler {
  getAllArticles = async (req: Request, res: Response) => {
    const articles = await articleService.getAllArticles();
    res.json(articles);
  };
  getArticleById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const article = await articleService.getArticleById(id);
    if (article) {
      res.json(article);
    } else {
      res.status(404).json({ message: "Article not found" });
    }
  };

  createArticle = async (req: Request & { file: File }, res: Response) => {
    const { title, description, username } = req.body;
    const picture = req.file ? req.file.filename : null;
    const articleData = { title, description, picture, username };
    try {
      const newArticle = await articleService.createArticle(articleData);
      res.status(201).json(newArticle);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  updateArticle = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const articleData = req.body;
    const updatedArticle = await articleService.updateArticle(id, articleData);
    if (updatedArticle) {
      res.json(updatedArticle);
    } else {
      res.status(404).json({ message: "Article not found" });
    }
  };

  deleteArticle = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const result = await articleService.deleteArticle(id);
    if (result) {
      res.json({ message: "Article deleted successfully" });
    } else {
      res.status(404).json({ message: "Article not found" });
    }
  };
}
