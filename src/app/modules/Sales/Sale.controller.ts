import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import SaleServices from './Sale.service';

const addSale = catchAsync(async (req: Request, res: Response) => {
  const sale = await SaleServices.addSaleIntoDB(
    req.body,
    req.user as JwtPayload,
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Sale added successfully',
    data: sale,
  });
});

const getAllSales = catchAsync(async (req: Request, res: Response) => {
  const { meta, sales } = await SaleServices.getAllSalesFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All sales fetched successfully',
    meta,
    data: sales,
  });
});

const getSaleById = catchAsync(async (req: Request, res: Response) => {
  const sale = await SaleServices.getSaleFromDB(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sale fetched successfully',
    data: sale,
  });
});

const deleteSaleById = catchAsync(async (req: Request, res: Response) => {
  await SaleServices.deleteSaleFromDB(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sale deleted successfully',
    data: null,
  });
});

const deleteMultipleSales = catchAsync(async (req: Request, res: Response) => {
  
  const sales = await SaleServices.deleteMultipleSalesFromDB(req.body.ids);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sales deleted successfully',
    data: sales,
  });
});

const SaleControllers = {
  addSale,
  getAllSales,
  getSaleById,
  deleteSaleById,
  deleteMultipleSales,
};

export default SaleControllers;
