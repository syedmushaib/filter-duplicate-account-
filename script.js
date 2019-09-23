var transactions = [
  [
    {
      id: 6,
      sourceAccount: "my_account",
      targetAccount: "internet_shop",
      amount: -250,
      category: "other",
      time: "2018-03-01T22:16:40.000Z"
    },
    {
      id: 102,
      sourceAccount: "my_account",
      targetAccount: "internet_shop",
      amount: -250,
      category: "other",
      time: "2018-03-01T22:16:50.000Z"
    }
  ],
  [
    {
      id: 13,
      sourceAccount: "my_account",
      targetAccount: "coffee_shop",
      amount: -50,
      category: "eating_out",
      time: "2018-04-01T10:24:00.000Z"
    },
    {
      id: 14,
      sourceAccount: "my_account",
      targetAccount: "coffee_shop",
      amount: -50,
      category: "eating_out",
      time: "2018-04-01T10:24:40.000Z"
    },
    {
      id: 15,
      sourceAccount: "my_account",
      targetAccount: "coffee_shop",
      amount: -50,
      category: "eating_out",
      time: "2018-04-01T10:25:10.000Z"
    }
  ],
  [
    {
      id: 30,
      sourceAccount: "my_account",
      targetAccount: "coffee_shop",
      amount: -90,
      category: "eating_out",
      time: "2018-05-07T09:54:21.000Z"
    },
    {
      id: 31,
      sourceAccount: "my_account",
      targetAccount: "coffee_shop",
      amount: -90,
      category: "eating_out",
      time: "2018-05-07T09:55:10.000Z"
    },
    {
      id: 32,
      sourceAccount: "my_account",
      targetAccount: "coffee_shop",
      amount: -90,
      category: "eating_out",
      time: "2018-05-07T09:56:09.000Z"
    },
    {
      id: 33,
      sourceAccount: "my_account",
      targetAccount: "coffee_shop",
      amount: -90,
      category: "eating_out",
      time: "2018-05-07T09:57:05.000Z"
    }
  ]
];


 // Function to filter all the transactions that have the same 'sourceAccount', 'targetAccount', 'category' and 'amount'
function _getFilteredTransactions (accounts, sourceAccount, targetAccount, category, amount) {

  const filterAccounts = accounts.filter((account, index) => {
    if (sourceAccount === account.sourceAccount && 
        targetAccount === account.targetAccount &&
        category === account.category && 
        amount === account.amount 
    )
      { 
        //Delete filtered account obj from transactions array
        delete accounts[index];
        return true;
      }
  });

  return filterAccounts;

}


function _sortByTime (accounts, timeOrder) {
  let sortByTime;

   if (!timeOrder) {
      sortByTime = accounts.sort((a, b) => new Date(a.time) < new Date(b.time) ?  1 : -1);
   } else {
      sortByTime = accounts.sort((a, b) => new Date(a.time) < new Date(b.time) ?  -1 : 1);
   }

   return sortByTime;
}

function _diff(A) {
  return A.slice(1).map(function(n, i) { 
    let timeDiff = Math.abs(new Date(n.time) - new Date(A[i].time));
    let timeDiffMins = Math.floor((timeDiff/1000)/60);
    console.log(timeDiff);
    return timeDiffMins; 
  });
}

 // Function to filter all the transactions for array inside array and which have the same 'sourceAccount', 'targetAccount', 'category' and 'amount'
function findDuplicateTransactions (transactions = []) {
  let duplicateTransactionsList = [],
      duplicateTransactionsAccountsList = []
      ;

  // Iterate through all the transactions   
  transactions.forEach(function(accounts) {

    let filterAccounts = [],
        filterAccountsByTime = []
        ;

    if (accounts.length > 0) {
        accounts.forEach(function(acc) {
          // Filter all the transactions that have the same 'sourceAccount', 'targetAccount', 'category' and 'amount'
          filterAccounts = _getFilteredTransactions(accounts, acc.sourceAccount, acc.targetAccount, acc.category, acc.amount);
        });
    } else {
      // Filter all the transactions that have the same 'sourceAccount', 'targetAccount', 'category' and 'amount'
      filterAccounts = _getFilteredTransactions(transactions, accounts.sourceAccount, accounts.targetAccount, accounts.category, accounts.amount);
    }

    if (filterAccounts.length > 1) {
      //Sort filterAccounts by time to compare 
      let sortByTime = _sortByTime(filterAccounts, true);
      
      sortByTime.slice(1).map((account, index) => {
        
        let timeDiff = Math.abs(new Date(account.time) - new Date(sortByTime[index].time));
        //Update time variable for next account time compare
        var timeDiffMins = Math.floor((timeDiff/1000)/60);
        if (timeDiffMins <= 0 ) {
          if (index === 0) {
            filterAccountsByTime.push(sortByTime[index]);
          }
          filterAccountsByTime.push(account);
        }
      });

      if (filterAccountsByTime.length > 1) {
        filterAccountsByTime.forEach (function(filterAccount) {
          duplicateTransactionsList.push(filterAccount);
        });
      }
    }

  });

  // duplicate transactions list ordered by time ascending
  const orderedByTimeAscending = _sortByTime(duplicateTransactionsList, true);
  // Filter all the transactions that have the same 'sourceAccount', 'targetAccount', 'category' and 'amount'
  orderedByTimeAscending.forEach(function(account) {
    const duplicateTransactionsAccounts = _getFilteredTransactions(orderedByTimeAscending, account.sourceAccount, account.targetAccount, account.category, account.amount);
    duplicateTransactionsAccountsList.push(duplicateTransactionsAccounts);
  });
  
  return duplicateTransactionsAccountsList;
}

findDuplicateTransactions(transactions);