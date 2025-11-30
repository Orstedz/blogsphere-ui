import type React from "react";
import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Table } from "@/components/ui/Table";
import { Modal } from "@/components/ui/Modal";
import { roleService } from "@/services/roles";
import type { Role } from "@/types";
import { Plus } from "lucide-react";
import { format } from "date-fns";

export const Roles: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [filteredRoles, setFilteredRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchRoles();
  }, []);

  useEffect(() => {
    const filtered = roles.filter((role) =>
      role.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRoles(filtered);
  }, [searchTerm, roles]);

  const fetchRoles = async () => {
    try {
      setLoading(true);
      const response = await roleService.getAll();
      setRoles(response.data?.data || []);
    } catch (error) {
      console.error("Error fetching roles:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingId(null);
    setFormData({ name: "", description: "" });
    setIsModalOpen(true);
  };

  const handleEdit = (role: Role) => {
    setEditingId(role.id);
    setFormData({ name: role.name, description: role.description || "" });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this role?")) {
      try {
        await roleService.delete(id);
        fetchRoles();
      } catch (error) {
        console.error("Error deleting role:", error);
      }
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      if (editingId) {
        await roleService.update(editingId, formData);
      } else {
        await roleService.create(formData);
      }
      fetchRoles();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving role:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const columns = [
    {
      header: "ID",
      accessor: "id",
      render: (v: string) => v.substring(0, 8) + "...",
    },
    { header: "Role Name", accessor: "name" },
    {
      header: "Description",
      accessor: "description",
      render: (v: string) => v || "-",
    },
    {
      header: "Date",
      accessor: "created_at",
      render: (v: string) => format(new Date(v), "HH:mm MM/dd/yyyy"),
    },
    {
      header: "Action",
      accessor: "id",
      render: (id: string, row: Role) => (
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
          <h1 className="text-3xl font-bold text-text-primary">Roles</h1>
          <Button variant="primary" onClick={handleCreate}>
            <Plus size={20} className="mr-2" />
            Create New Role
          </Button>
        </div>

        <div className="bg-bg-secondary border border-bg-tertiary rounded-lg p-4">
          <Input
            placeholder="Search for roles"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="bg-bg-secondary border border-bg-tertiary rounded-lg overflow-hidden">
          <Table columns={columns} data={filteredRoles} loading={loading} />
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? "Edit Role" : "Create New Role"}
        onSubmit={handleSubmit}
        submitText={editingId ? "Update" : "Create"}
        isLoading={isSubmitting}
      >
        <div className="space-y-4">
          <Input
            label="Role Name"
            placeholder="Enter role name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Input
            label="Description"
            placeholder="Enter description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>
      </Modal>
    </Layout>
  );
};
