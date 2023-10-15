/*
  Warnings:

  - You are about to alter the column `expense` on the `Expenses` table. The data in that column could be lost. The data in that column will be cast from `String` to `Float`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Expenses" (
    "expenseId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "expense" REAL NOT NULL,
    "description" TEXT NOT NULL,
    "dateTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "groupName" TEXT NOT NULL,
    CONSTRAINT "Expenses_groupName_fkey" FOREIGN KEY ("groupName") REFERENCES "Groups" ("groupName") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Expenses" ("dateTime", "description", "expense", "expenseId", "groupName") SELECT "dateTime", "description", "expense", "expenseId", "groupName" FROM "Expenses";
DROP TABLE "Expenses";
ALTER TABLE "new_Expenses" RENAME TO "Expenses";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
