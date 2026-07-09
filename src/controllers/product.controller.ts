import { Request, Response } from "express";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { T } from "../libs/types/common";
import ProductService from "../models/Product.service";
const productService = new ProductService();
import { ProductInput, ProductInquiry } from "../libs/types/product";
import { AdminRequest, ExtendedRequest } from "../libs/types/member";
import { ProductCollection } from "../libs/enums/product.enum";

const productController: T = {};

/** SPA */
productController.getProducts = async (req: Request, res: Response) => {
  try {
    console.log("getProducts");
    const {page, limit , order, productCollection, search } = req.query;
   const inquiry: ProductInquiry = {
  order: String(order),
  page: Number(page),
  limit: Number(limit),
};
if (productCollection)
  inquiry.productCollection = productCollection as ProductCollection;
if (search) inquiry.search = String(search);

const result = await productService.getProducts(inquiry);
    


    res.status(HttpCode.OK).json({ result: "DONE" });  
  } catch (err) {
    console.log("Error, getProducts:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

productController.getProduct = async (req: ExtendedRequest, res: Response) => {
  try {
    console.log("getProduct");
    const { id } = req.params;
    const memberId = req.member?._id ?? null,
      result = await productService.getProduct(memberId, id);

    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("Error, getProduct:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
}; 

//SSR

productController.getAllProducts = async (req: Request, res: Response) => {
  try {
    console.log("getAllProducts");
    const data = await productService.getAllProducts();
    console.log("products", data);

    console.log("data:", data);

    res.render("products", { products: data });
    //'products.ejs' shablonini ishga tushiramiz
    // va uning ichiga 'products' nomi bilan 'data' (mahsulotlarimizni) joylab, brauzerga yuboramiz
  } catch (err) {
    console.log("Error, getAllProducts:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

productController.createNewProduct = async (
  req: AdminRequest,
  res: Response,
) => {
  try {
    console.log("createNewProduct");
    console.log("req.body:", req.body);
    if (!req.files?.length)
      ///Agar so'rovda rasmlar kelmagan bo'lsa xatolik qaytadi
      throw new Errors(HttpCode.INTERNAL_SERVER_ERROR, Message.CREATE_FAILED);

    const data: ProductInput = req.body;
    data.productImages = req.files?.map((ele) => {
      return ele.path.replace(/\\/g, "/");
    });

    console.log("data:", data);

    await productService.createNewProduct(data);
    res.send(
      `<script> alert("Sucessfully created!"); window.location.replace('/admin/product/all') </script>`,
    );
    //res.send("DONE!");
  } catch (err) {
    console.log("Error, createNewProduct:", err);
    const message =
      err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
    res.send(
      `<script> alert("${message}"); window.location.replace('/admin/product/all') </script>`,
    );
  }
};

productController.updateChosenProduct = async (req: Request, res: Response) => {
  try {
    console.log("updateChosenProduct");

    //o'zgartirilishi kerak bo'lgan mahsulot ID-sini olamiz (masalan: /product/12345)
    const id = req.params.id as string;
    console.log("id:", id); //// Olingan ID to'g'riligini tekshirish uchun konsolga chiqaramiz

    const result = await productService.updateChosenProduct(id, req.body);
    //ichida mahsulotning o'zgargan yangi narxi, nomi yoki holati keladi

    res.status(HttpCode.OK).json({ data: result });
  } catch (err) {
    console.log("Error, updateChosenProduct:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

export default productController;
