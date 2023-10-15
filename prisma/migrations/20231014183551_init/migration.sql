-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Groups" (
    "groupName" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "Expenses" (
    "expenseId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "expense" REAL NOT NULL,
    "description" TEXT NOT NULL,
    "dateTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "groupName" TEXT NOT NULL,
    CONSTRAINT "Expenses_groupName_fkey" FOREIGN KEY ("groupName") REFERENCES "Groups" ("groupName") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_GroupsToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_GroupsToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Groups" ("groupName") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_GroupsToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Groups_groupName_key" ON "Groups"("groupName");

-- CreateIndex
CREATE UNIQUE INDEX "_GroupsToUser_AB_unique" ON "_GroupsToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_GroupsToUser_B_index" ON "_GroupsToUser"("B");
