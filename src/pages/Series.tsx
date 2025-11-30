import type React from "react";
import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Table } from "@/components/ui/Table";
import { Modal } from "@/components/ui/Modal";
import { Badge } from "@/components/ui/Badge";
import { seriesService } from "@/services/series";
import type { Series } from "@/types";
import { Plus } from "lucide-react";
import { format } from "date-fns";

export const SeriesPage: React.FC = () => {
  const [series, setSeries] = useState<Series[]>([]);
  const [filteredSeries, setFilteredSeries] = useState<Series[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "Active",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchSeries();
  }, []);

  useEffect(() => {
    const filtered = series.filter((s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSeries(filtered);
  }, [searchTerm, series]);

  const fetchSeries = async () => {
    try {
      const response = await seriesService.getAll();
      setSeries(response.data?.data || []);
    } catch (error) {
      console.error("Error fetching series:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingId(null);
    setFormData({ name: "", description: "", status: "Active" });
    setIsModalOpen(true);
  };

  const handleEdit = (s: Series) => {
    setEditingId(s.id);
    setFormData({
      name: s.name,
      description: s.description || "",
      status: s.status,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this series?")) {
      try {
        await seriesService.delete(id);
        fetchSeries();
      } catch (error) {
        console.error("Error deleting series:", error);
      }
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      if (editingId) {
        await seriesService.update(editingId, formData);
      } else {
        await seriesService.create(formData);
      }
      fetchSeries();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving series:", error);
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
    { header: "Series Name", accessor: "name" },
    {
      header: "Description",
      accessor: "description",
      render: (v: string) => v || "-",
    },
    {
      header: "Status",
      accessor: "status",
      render: (v: string) => (
        <Badge variant={v === "Active" ? "success" : "danger"}>{v}</Badge>
      ),
    },
    {
      header: "Date",
      accessor: "created_at",
      render: (v: string) => format(new Date(v), "HH:mm MM/dd/yyyy"),
    },
    {
      header: "Action",
      accessor: "id",
      render: (id: string, row: Series) => (
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
          <h1 className="text-3xl font-bold text-text-primary">Series</h1>
          <Button variant="primary" onClick={handleCreate}>
            <Plus size={20} className="mr-2" />
            Create New Series
          </Button>
        </div>

        <div className="bg-bg-secondary border border-bg-tertiary rounded-lg p-4">
          <Input
            placeholder="Search for series"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="bg-bg-secondary border border-bg-tertiary rounded-lg overflow-hidden">
          <Table columns={columns} data={filteredSeries} loading={loading} />
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? "Edit Series" : "Create New Series"}
        onSubmit={handleSubmit}
        submitText={editingId ? "Update" : "Create"}
        isLoading={isSubmitting}
      >
        <div className="space-y-4">
          <Input
            label="Series Name"
            placeholder="Enter series name"
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
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              className="w-full px-3 py-2 bg-bg-tertiary text-text-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
      </Modal>
    </Layout>
  );
};
