-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'CSKH', 'TECH', 'MANAGER');

-- CreateEnum
CREATE TYPE "CustomerType" AS ENUM ('PERSONAL', 'BUSINESS', 'ENTERPRISE');

-- CreateEnum
CREATE TYPE "Segment" AS ENUM ('VIP', 'NORMAL', 'POTENTIAL');

-- CreateEnum
CREATE TYPE "ContactType" AS ENUM ('PHONE', 'EMAIL', 'ZALO', 'FACEBOOK');

-- CreateEnum
CREATE TYPE "WarrantyStatus" AS ENUM ('OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED');

-- CreateEnum
CREATE TYPE "InteractionType" AS ENUM ('CALL', 'SMS', 'ZALO', 'EMAIL', 'MEETING', 'OTHER');

-- CreateEnum
CREATE TYPE "ReminderStatus" AS ENUM ('PENDING', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "ZnsTemplateStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'PENDING_APPROVAL', 'REJECTED');

-- CreateEnum
CREATE TYPE "ZnsStatus" AS ENUM ('QUEUED', 'SENT', 'DELIVERED', 'FAILED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "TriggerType" AS ENUM ('CRON', 'WARRANTY_ENDING', 'CUSTOMER_CREATED', 'PURCHASE_MADE');

-- CreateEnum
CREATE TYPE "ActionType" AS ENUM ('SEND_ZNS', 'CREATE_REMINDER', 'SEND_EMAIL', 'WEBHOOK');

-- CreateEnum
CREATE TYPE "JobStatus" AS ENUM ('PENDING', 'RUNNING', 'SUCCESS', 'FAILED');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'CSKH',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by_id" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customers" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "phone_primary" TEXT,
    "email_primary" TEXT,
    "customer_type" "CustomerType" NOT NULL DEFAULT 'PERSONAL',
    "segment" "Segment" NOT NULL DEFAULT 'NORMAL',
    "source" TEXT,
    "notes" TEXT,
    "dob" TIMESTAMP(3),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customer_contacts" (
    "id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "type" "ContactType" NOT NULL,
    "value" TEXT NOT NULL,
    "is_primary" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "customer_contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchases" (
    "id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "purchase_date" TIMESTAMP(3) NOT NULL,
    "source" TEXT,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "purchases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customer_products" (
    "id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "purchase_id" TEXT NOT NULL,
    "product_model" TEXT NOT NULL,
    "product_serial" TEXT,
    "purchase_date" TIMESTAMP(3) NOT NULL,
    "warranty_months" INTEGER NOT NULL DEFAULT 24,
    "warranty_end_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customer_products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "warranty_cases" (
    "id" TEXT NOT NULL,
    "customer_product_id" TEXT NOT NULL,
    "status" "WarrantyStatus" NOT NULL DEFAULT 'OPEN',
    "issue_description" TEXT NOT NULL,
    "resolution" TEXT,
    "opened_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "closed_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "warranty_cases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "interactions" (
    "id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "type" "InteractionType" NOT NULL,
    "content" TEXT NOT NULL,
    "owner_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "interactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reminders" (
    "id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "interaction_id" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "follow_up_at" TIMESTAMP(3) NOT NULL,
    "status" "ReminderStatus" NOT NULL DEFAULT 'PENDING',
    "owner_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reminders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "zns_templates" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "zalo_template_id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "variables" TEXT NOT NULL,
    "status" "ZnsTemplateStatus" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "zns_templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "zns_message_logs" (
    "id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "template_id" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "payload" TEXT NOT NULL,
    "status" "ZnsStatus" NOT NULL DEFAULT 'QUEUED',
    "zalo_msg_id" TEXT,
    "error_code" TEXT,
    "sent_at" TIMESTAMP(3),
    "delivered_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "zns_message_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "automation_rules" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "trigger_type" "TriggerType" NOT NULL,
    "trigger_config" TEXT NOT NULL,
    "action_type" "ActionType" NOT NULL,
    "action_config" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "automation_rules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "automation_job_runs" (
    "id" TEXT NOT NULL,
    "rule_id" TEXT NOT NULL,
    "status" "JobStatus" NOT NULL DEFAULT 'PENDING',
    "error_message" TEXT,
    "executed_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "automation_job_runs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "customers_code_key" ON "customers"("code");

-- CreateIndex
CREATE INDEX "customers_phone_primary_idx" ON "customers"("phone_primary");

-- CreateIndex
CREATE INDEX "customers_email_primary_idx" ON "customers"("email_primary");

-- CreateIndex
CREATE INDEX "customers_segment_idx" ON "customers"("segment");

-- CreateIndex
CREATE INDEX "customer_contacts_customer_id_idx" ON "customer_contacts"("customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "customer_contacts_customer_id_type_value_key" ON "customer_contacts"("customer_id", "type", "value");

-- CreateIndex
CREATE INDEX "purchases_customer_id_idx" ON "purchases"("customer_id");

-- CreateIndex
CREATE INDEX "purchases_purchase_date_idx" ON "purchases"("purchase_date");

-- CreateIndex
CREATE INDEX "customer_products_customer_id_idx" ON "customer_products"("customer_id");

-- CreateIndex
CREATE INDEX "customer_products_warranty_end_at_idx" ON "customer_products"("warranty_end_at");

-- CreateIndex
CREATE INDEX "warranty_cases_customer_product_id_idx" ON "warranty_cases"("customer_product_id");

-- CreateIndex
CREATE INDEX "warranty_cases_status_idx" ON "warranty_cases"("status");

-- CreateIndex
CREATE INDEX "interactions_customer_id_idx" ON "interactions"("customer_id");

-- CreateIndex
CREATE INDEX "interactions_owner_id_idx" ON "interactions"("owner_id");

-- CreateIndex
CREATE INDEX "reminders_customer_id_idx" ON "reminders"("customer_id");

-- CreateIndex
CREATE INDEX "reminders_follow_up_at_idx" ON "reminders"("follow_up_at");

-- CreateIndex
CREATE INDEX "reminders_status_idx" ON "reminders"("status");

-- CreateIndex
CREATE UNIQUE INDEX "zns_templates_zalo_template_id_key" ON "zns_templates"("zalo_template_id");

-- CreateIndex
CREATE INDEX "zns_message_logs_customer_id_idx" ON "zns_message_logs"("customer_id");

-- CreateIndex
CREATE INDEX "zns_message_logs_status_idx" ON "zns_message_logs"("status");

-- CreateIndex
CREATE INDEX "automation_job_runs_rule_id_idx" ON "automation_job_runs"("rule_id");

-- CreateIndex
CREATE INDEX "automation_job_runs_status_idx" ON "automation_job_runs"("status");

-- AddForeignKey
ALTER TABLE "customer_contacts" ADD CONSTRAINT "customer_contacts_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_products" ADD CONSTRAINT "customer_products_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_products" ADD CONSTRAINT "customer_products_purchase_id_fkey" FOREIGN KEY ("purchase_id") REFERENCES "purchases"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "warranty_cases" ADD CONSTRAINT "warranty_cases_customer_product_id_fkey" FOREIGN KEY ("customer_product_id") REFERENCES "customer_products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interactions" ADD CONSTRAINT "interactions_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interactions" ADD CONSTRAINT "interactions_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reminders" ADD CONSTRAINT "reminders_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reminders" ADD CONSTRAINT "reminders_interaction_id_fkey" FOREIGN KEY ("interaction_id") REFERENCES "interactions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zns_message_logs" ADD CONSTRAINT "zns_message_logs_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zns_message_logs" ADD CONSTRAINT "zns_message_logs_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "zns_templates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "automation_job_runs" ADD CONSTRAINT "automation_job_runs_rule_id_fkey" FOREIGN KEY ("rule_id") REFERENCES "automation_rules"("id") ON DELETE CASCADE ON UPDATE CASCADE;
