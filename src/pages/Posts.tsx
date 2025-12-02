import type React from "react";
import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Table } from "@/components/ui/Table";
import { Modal } from "@/components/ui/Modal";
import { Badge } from "@/components/ui/Badge";
import { postService } from "@/services/posts";
import { categoryService } from "@/services/categories";
import { seriesService } from "@/services/series";
import type { Post, Category, Series } from "@/types";
import { Plus } from "lucide-react";
import { format } from "date-fns";

export const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [series, setSeries] = useState<Series[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category_id: "" as string | number,
    series_id: "" as string | number,
    status: "Draft" as "Draft" | "Published" | "Archived",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchPosts();
    fetchCategories();
    fetchSeries();
  }, []);

  useEffect(() => {
    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(filtered);
  }, [searchTerm, posts]);

  const fetchPosts = async () => {
    try {
      const response = await postService.getAll();
      const sortedPosts = (response.data?.data || []).sort(
        (a, b) => a.id - b.id
      );
      setPosts(sortedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await categoryService.getAll();
      setCategories(response.data?.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchSeries = async () => {
    try {
      const response = await seriesService.getAll();
      setSeries(response.data?.data || []);
    } catch (error) {
      console.error("Error fetching series:", error);
    }
  };

  const handleCreate = () => {
    setEditingId(null);
    setFormData({
      title: "",
      content: "",
      category_id: "",
      series_id: "",
      status: "Draft",
    });
    setIsModalOpen(true);
  };

  const handleEdit = (post: Post) => {
    setEditingId(post.id);
    setFormData({
      title: post.title,
      content: post.content,
      category_id: post.category_id || "",
      series_id: post.series_id || "",
      status: post.status,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await postService.delete(id);
        fetchPosts();
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const data: any = {
        ...formData,
        category_id: formData.category_id
          ? Number(formData.category_id)
          : undefined,
        series_id: formData.series_id ? Number(formData.series_id) : undefined,
      };
      if (editingId) {
        await postService.update(editingId, data);
      } else {
        await postService.create(data);
      }
      fetchPosts();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const columns = [
    {
      header: "ID",
      accessor: "id",
      render: (v: number) => v,
    },
    { header: "Title", accessor: "title" },
    {
      header: "Category",
      accessor: "category_name",
      render: (v: string) => v || "-",
    },
    {
      header: "Author",
      accessor: "author_name",
      render: (v: string) => v || "-",
    },
    {
      header: "Status",
      accessor: "status",
      render: (v: string) => (
        <Badge variant={v === "Published" ? "default" : "secondary"}>{v}</Badge>
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
      render: (id: number, row: Post) => (
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
          <h1 className="text-3xl font-bold text-text-primary">Posts</h1>
          <Button onClick={handleCreate}>
            <Plus size={20} className="mr-2" />
            Create New Post
          </Button>
        </div>

        <div className="bg-bg-secondary border border-bg-tertiary rounded-lg p-4">
          <Input
            placeholder="Search for posts"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="bg-bg-secondary border border-bg-tertiary rounded-lg overflow-hidden">
          <Table columns={columns} data={filteredPosts} loading={loading} />
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? "Edit Post" : "Create New Post"}
        onSubmit={handleSubmit}
        submitText={editingId ? "Update" : "Create"}
        isLoading={isSubmitting}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Title
            </label>
            <Input
              placeholder="Enter post title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Content
            </label>
            <textarea
              placeholder="Enter post content"
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              className="w-full px-3 py-2 bg-bg-tertiary text-text-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              rows={4}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Category
            </label>
            <select
              value={formData.category_id}
              onChange={(e) =>
                setFormData({ ...formData, category_id: e.target.value })
              }
              className="w-full px-3 py-2 bg-bg-tertiary text-text-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Series (Optional)
            </label>
            <select
              value={formData.series_id}
              onChange={(e) =>
                setFormData({ ...formData, series_id: e.target.value })
              }
              className="w-full px-3 py-2 bg-bg-tertiary text-text-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="">No series</option>
              {series.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value as "Draft" | "Published" | "Archived",
                })
              }
              className="w-full px-3 py-2 bg-bg-tertiary text-text-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
              <option value="Archived">Archived</option>
            </select>
          </div>
        </div>
      </Modal>
    </Layout>
  );
};
