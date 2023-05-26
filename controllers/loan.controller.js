const loanService = require("../services/loan.service");

exports.getAllLoans = async (req, res) => {
  try {
    const loans = await loanService.getAllLoans();
    res.status(200).json({ data: loans, message: "got loans" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getLoanById = async (req, res) => {
  try {
    const loan = await loanService.getLoanById(req.params.id);
    res.status(200).json({ data: loan, message: "got loan" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createLoan = async (req, res) => {
  try {
    const loan = await loanService.createLoan(req.body);
    res.status(200).json({ data: loan, message: "added loan" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateBorrower = async (req, res) => {
  try {
    const borrower = await loanService.updateBorrower(
      req.params.id,
      req.body.pairId,
      req.body.borrowerData
    );
    res.status(200).json({ data: borrower, message: "updated borrower info" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteBorrower = async (req, res) => {
  try {
    await loanService.deleteBorrower(
      req.params.id,
      req.body.pairId,
    );
    res.status(200).json({ message: "borrower deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteLoan = async (req, res) => {
  try {
    const borrower = await loanService.deleteLoan(
      req.params.id,
    );
    res.status(200).json({ message: "deleted loan" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};