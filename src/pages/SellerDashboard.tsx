
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { AlertCircle, Plus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useProducts, Material } from "@/contexts/ProductContext";
import { useScanner } from "@/contexts/ScannerContext";
import { toast } from "sonner";

const SellerDashboard = () => {
  const { user } = useAuth();
  const { addProduct, materials, categories } = useProducts();
  const { analyzeMaterials } = useScanner();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState<string>("https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd");
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [newMaterial, setNewMaterial] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableMaterials = materials.filter(
    (m) => !selectedMaterials.includes(m.name)
  );

  const handleMaterialSelect = (materialName: string) => {
    if (materialName && !selectedMaterials.includes(materialName)) {
      setSelectedMaterials([...selectedMaterials, materialName]);
      setNewMaterial("");
    }
  };

  const handleRemoveMaterial = (materialName: string) => {
    setSelectedMaterials(selectedMaterials.filter((m) => m !== materialName));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !description || !price || !category || selectedMaterials.length === 0) {
      toast.error("Please fill in all fields and select at least one material");
      return;
    }

    setIsSubmitting(true);

    try {
      // Analyze materials for eco-score
      const selectedMaterialObjects = selectedMaterials
        .map((name) => materials.find((m) => m.name === name))
        .filter((m): m is Material => m !== undefined);

      const newProduct = {
        name,
        description,
        price: parseFloat(price),
        category,
        image,
        materials: selectedMaterialObjects,
        seller: {
          id: user?.id || "",
          name: user?.name || "Unknown Seller",
        },
        reviews: [],
      };

      addProduct(newProduct);
      
      toast.success("Product added successfully!");
      
      // Reset form
      setName("");
      setDescription("");
      setPrice("");
      setCategory("");
      setImage("https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd");
      setSelectedMaterials([]);
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Seller Dashboard</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Add New Product</CardTitle>
          <CardDescription>
            List your eco-friendly product for buyers to discover
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price (₹)</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select 
                value={category} 
                onValueChange={setCategory}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.slice(1).map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="image">Product Image</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {image && (
                  <div className="aspect-square rounded-md overflow-hidden">
                    <img
                      src={image}
                      alt="Product preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Materials</Label>
              <div className="flex gap-2">
                <Select 
                  value={newMaterial} 
                  onValueChange={handleMaterialSelect}
                >
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select a material" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableMaterials.map((mat) => (
                      <SelectItem key={mat.name} value={mat.name}>
                        {mat.name} (Eco-Score: {mat.ecoScore}/10)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {selectedMaterials.length > 0 ? (
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedMaterials.map((mat) => (
                    <div 
                      key={mat} 
                      className="bg-accent px-3 py-1 rounded-full flex items-center gap-1"
                    >
                      <span>{mat}</span>
                      <button
                        type="button"
                        className="text-gray-500 hover:text-gray-700"
                        onClick={() => handleRemoveMaterial(mat)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-gray-500 flex items-center gap-2 mt-2">
                  <AlertCircle className="h-4 w-4" />
                  <span>Select at least one material to analyze eco-score</span>
                </div>
              )}
            </div>
            
            <Button 
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                "Analyzing and Adding Product..."
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Product
                </>
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="bg-accent/40 text-sm text-gray-600 rounded-b-lg">
          <p>
            Note: Your product will be automatically analyzed based on the materials 
            used to determine its eco-score. Products with higher eco-scores are 
            more visible to eco-conscious buyers.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SellerDashboard;
