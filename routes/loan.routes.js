const express = require("express");

const {
  getAllLoans,
  createLoan,
  getLoanById,
  deleteLoan,
  updateBorrower,
  deleteBorrower,
} = require("../controllers/loan.controller");

const router = express.Router();

router.route("/").get(getAllLoans);
router.route("/loan").post(createLoan);
router.route("/loan/:id").get(getLoanById).delete(deleteLoan);
router.route("/loan/:id/borrower").patch(updateBorrower);
router.route("/loan/:id/borrower").patch(deleteBorrower);

module.exports = router;
