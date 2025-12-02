import type React from "react";
import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Table } from "@/components/ui/Table";
import { Modal } from "@/components/ui/Modal";
import { userService } from "@/services/users";
import { roleService } from "@/services/roles";
import type { User, Role } from "@/types";
import { Plus } from "lucide-react";
import { format } from "date-fns";

export const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "" as string | number,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const fetchUsers = async () => {
    try {
      const response = await userService.getAll();
      const sortedUsers = (response.data?.data || []).sort(
        (a, b) => a._id - b._id
      );
      setUsers(sortedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await roleService.getAll();
      const sortedRoles = (response.data?.data || []).sort(
        (a, b) => a._id - b._id
      );
      setRoles(sortedRoles);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  const handleCreate = () => {
    setEditingId(null);
    setFormData({ username: "", email: "", password: "", role: "" });
    setIsModalOpen(true);
  };

  const handleEdit = (user: User) => {
    setEditingId(user._id);
    setFormData({
      username: user.username,
      email: user.email,
      password: "",
      role:
        typeof user.role === "object" && user.role
          ? user.role._id
          : (user.role as number) || "",
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await userService.delete(id);
        fetchUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const data: any = {
        username: formData.username,
        email: formData.email,
        role: formData.role || undefined,
      };
      if (formData.password) data.password = formData.password;

      if (editingId) {
        await userService.update(editingId, data);
      } else {
        data.password = formData.password || "DefaultPassword123!";
        await userService.create(data);
      }
      fetchUsers();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving user:", error);
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
    { header: "Username", accessor: "username" },
    { header: "Email", accessor: "email" },
    {
      header: "Role",
      accessor: "role",
      render: (v: any) => (typeof v === "object" && v?.name ? v.name : "-"),
    },
    {
      header: "Date",
      accessor: "createdAt",
      render: (v: string) => format(new Date(v), "HH:mm MM/dd/yyyy"),
    },
    {
      header: "Action",
      accessor: "_id",
      render: (id: number, row: User) => (
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
          <h1 className="text-3xl font-bold text-text-primary">Users</h1>
          <Button onClick={handleCreate}>
            <Plus size={20} className="mr-2" />
            Create New User
          </Button>
        </div>

        <div className="bg-bg-secondary border border-bg-tertiary rounded-lg p-4">
          <Input
            placeholder="Search for users"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="bg-bg-secondary border border-bg-tertiary rounded-lg overflow-hidden">
          <Table columns={columns} data={filteredUsers} loading={loading} />
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? "Edit User" : "Create New User"}
        onSubmit={handleSubmit}
        submitText={editingId ? "Update" : "Create"}
        isLoading={isSubmitting}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Username
            </label>
            <Input
              placeholder="Enter username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Email
            </label>
            <Input
              type="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              {editingId ? "Password (leave empty to keep)" : "Password"}
            </label>
            <Input
              type="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Role
            </label>
            <select
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: Number(e.target.value) || "" })
              }
              className="w-full px-3 py-2 bg-bg-tertiary text-text-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="">Select a role</option>
              {roles.map((role) => (
                <option key={role._id} value={role._id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Modal>
    </Layout>
  );
};
