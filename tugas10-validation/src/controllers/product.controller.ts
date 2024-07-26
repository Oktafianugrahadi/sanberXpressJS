import { Request, Response } from "express";
import ProductsModel from "../models/products.model";
import * as Yup from "yup"; // Pastikan Yup diimpor dengan benar

const createValidationSchema = Yup.object().shape({
  name: Yup.string().required(),
  price: Yup.number().required(),
  category: Yup.string().required(),
  description: Yup.string().required(),
  images: Yup.array().of(Yup.string()).required().min(1),
  qty: Yup.number().required().min(1),
});

interface IPaginationQuery {
  page: number;
  limit: number;
  search?: string;
}

export default {
  async create(req: Request, res: Response) {
    try {
      await createValidationSchema.validate(req.body);
      const result = await ProductsModel.create(req.body);
      res.status(201).json({
        data: result,
        message: "Success create product",
      });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        res.status(400).json({
          data: error.errors,
          message: "Failed create product",
        });
        return;
      }

      res.status(500).json({
        data: (error as Error).message,
        message: "Failed create product",
      });
    }
  },

  async findAll(req: Request, res: Response) {
    try {
      const {
        limit = 10,
        page = 1,
        search = "",
      } = req.query as unknown as IPaginationQuery;

      const query: any = {}; // Pastikan query adalah objek

      if (search) {
        query.name = { $regex: search, $options: "i" };
      }

      const result = await ProductsModel.find(query)
        .limit(Number(limit)) // Pastikan limit dan page dikonversi ke angka
        .skip((Number(page) - 1) * Number(limit))
        .sort({ createdAt: -1 })
        .populate("category");

      const total = await ProductsModel.countDocuments(query);

      res.status(200).json({
        data: result,
        message: "Success get all products",
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / Number(limit)),
      });
    } catch (error) {
      res.status(500).json({
        data: (error as Error).message,
        message: "Failed get all products",
      });
    }
  },

  async findOne(req: Request, res: Response) {
    try {
      const result = await ProductsModel.findOne({ _id: req.params.id });
      if (!result) {
        return res.status(404).json({
          message: "Product not found",
        });
      }
      res.status(200).json({
        data: result,
        message: "Success get one product",
      });
    } catch (error) {
      res.status(500).json({
        data: (error as Error).message,
        message: "Failed get one product",
      });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const result = await ProductsModel.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );

      if (!result) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      res.status(200).json({
        data: result,
        message: "Success update product",
      });
    } catch (error) {
      res.status(500).json({
        data: (error as Error).message,
        message: "Failed update product",
      });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const result = await ProductsModel.findOneAndDelete({
        _id: req.params.id,
      });

      if (!result) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      res.status(200).json({
        data: result,
        message: "Success delete product",
      });
    } catch (error) {
      res.status(500).json({
        data: (error as Error).message,
        message: "Failed delete product",
      });
    }
  },
};
