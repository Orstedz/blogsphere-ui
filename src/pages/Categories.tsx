import type React from "react";
import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Table } from "@/components/ui/Table";
import { Modal } from "@/components/ui/Modal";

import { categoryService } from "@/services/categories";
import type { Category } from "@/types";
import { Plus } from "lucide-react";
import { format } from "date-fns";

export const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const filtered = categories.filter((cat) =>
      cat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCategories(filtered);
  }, [searchTerm, categories]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await categoryService.getAll();
      const sortedCategories = (response.data?.data || []).sort(
        (a, b) => a._id - b._id
      );
      setCategories(sortedCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingId(null);
    setFormData({ name: "", description: "" });
    setIsModalOpen(true);
  };

  const handleEdit = (category: Category) => {
    setEditingId(category._id);
    setFormData({
      name: category.name,
      description: category.description || "",
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await categoryService.delete(id);
        fetchCategories();
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      if (editingId) {
        await categoryService.update(editingId, formData);
      } else {
        await categoryService.create(formData);
      }
      fetchCategories();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving category:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const columns = [
    {
      header: "ID",
      accessor: "_id",
      render: (v: number) => v.toString(),
    },
    { header: "Category", accessor: "name" },
    {
      header: "Description",
      accessor: "description",
      render: (v: string) => v || "-",
    },
    {
      header: "Date",
      accessor: "createdAt",
      render: (v: string) => format(new Date(v), "HH:mm MM/dd/yyyy"),
    },
    {
      header: "Action",
      accessor: "_id",
      render: (id: number, row: Category) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEdit(row)}
            className="text-accent hover:underline text-sm"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(id)}
            className="text-danger hover:underline text-sm"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-text-primary">Categories</h1>
          <Button onClick={handleCreate}>
            <Plus size={20} className="mr-2" />
            Create New Category
          </Button>
        </div>

        <div className="bg-bg-secondary border border-bg-tertiary rounded-lg p-4">
          <Input
            placeholder="Search for categories"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="bg-bg-secondary border border-bg-tertiary rounded-lg overflow-hidden">
          <Table
            columns={columns}
            data={filteredCategories}
            loading={loading}
          />
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? "Edit Category" : "Create New Category"}
        onSubmit={handleSubmit}
        submitText={editingId ? "Update" : "Create"}
        isLoading={isSubmitting}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Category Name
            </label>
            <Input
              placeholder="Enter category name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Description
            </label>
            <Input
              placeholder="Enter description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>
        </div>
      </Modal>
    </Layout>
  );
};
