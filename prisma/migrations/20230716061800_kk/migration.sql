/*
  Warnings:

  - You are about to drop the column `supervisorId` on the `User` table. All the data in the column will be lost.
  - Added the required column `title` to the `Conversation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_supervisorId_fkey";

-- AlterTable
ALTER TABLE "Conversation" ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "supervisorId";

-- CreateTable
CREATE TABLE "_SupervisorToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_SupervisorToUser_AB_unique" ON "_SupervisorToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_SupervisorToUser_B_index" ON "_SupervisorToUser"("B");

-- AddForeignKey
ALTER TABLE "_SupervisorToUser" ADD CONSTRAINT "_SupervisorToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Supervisor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SupervisorToUser" ADD CONSTRAINT "_SupervisorToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
