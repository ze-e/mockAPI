const Loan = require("../models/Loan.model");

// GET all loan objects
async function getAllLoans() {
  try {
    const loans = await Loan.find();
    return loans;
  } catch (error) {
    throw new Error(`Error while retrieving loans: ${error}`);
  }
}

// GET one loan object by loanId
async function getLoanById(loanId) {
  try {
    const loan = await Loan.findOne({loanId: loanId});
    return loan;
  } catch (error) {
    throw new Error(`Error while retrieving loan: ${error}`);
  }
}

// POST method to add a new loan object with an array of borrowers
async function createLoan(loanData) {
  try {
    const loan = await Loan.create(loanData);
    return loan;
  } catch (error) {
    throw new Error(`Error while adding loan: ${error}`);
  }
}

// PATCH method to update borrower information by loanId and pairId
async function updateBorrower(loanId, pairId, borrowerData) {
  try {
    const loan = await Loan.findOne({ loanId: loanId });
    if (!loan) {
      throw new Error(`Loan not found`);
    }
    if (!loan.borrowers) {
      throw new Error(`Loan does not contain borrowers`);
    }
    const borrower = loan.borrowers.find(
      (b) => b.pairId.toString() === pairId.toString()
    );
    if (!borrower) {
      throw new Error(`Borrower not found`);
    }
    Object.assign(borrower, borrowerData);
    await loan.save();
    return borrower;
  } catch (error) {
    throw new Error(`Error while updating borrower information: ${error}`);
  }
}

// PATCH or DELETE method to delete a borrower by loanId and pairId
async function deleteBorrower(loanId, pairId) {
  try {
    const loan = await Loan.findOne({ loanId: loanId });
    if (!loan.borrowers) {
      throw new Error(`Loan does not contain borrowers`);
    }
    const borrower = loan.borrowers.find(
      (b) => b.pairId.toString() === pairId.toString()
    );
    if (!borrower) {
      throw new Error(`Borrower not found`);
    }
    await loan.save();
  } catch (error) {
    throw new Error(`Error while deleting borrower`);
  }
}

// DELETE method to delete a loan object by loanId
async function deleteLoan(loanId) {
  try {
    await Loan.findOneAndDelete({ loanId: loanId });
  } catch (error) {
    throw new Error(`Error while deleting loan`);
  }
}

// DELETE method to delete a loan object by loanId
async function deleteAll() {
  // try {
  //   await Loan.deleteMany({ _id: { $ne: null } });
  // } catch (error) {
  //   throw new Error(`Error while deleting`);
  // }
  throw new Error(`Deleting disabled`);
}

module.exports = {
  getAllLoans,
  getLoanById,
  createLoan,
  updateBorrower,
  deleteBorrower,
  deleteLoan,
  deleteAll
};
