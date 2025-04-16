
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  HeadphonesIcon, 
  Mail, 
  Phone, 
  MapPin, 
  MessageSquare,
  Clock
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const CustomerCarePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !message) {
      toast.error("Please fill in all fields");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success("Message sent successfully! We'll get back to you soon.");
      setName("");
      setEmail("");
      setMessage("");
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2">Customer Care</h1>
        <p className="text-gray-500">
          We're here to help with any questions about eco-friendly products
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card>
          <CardContent className="pt-6 text-center">
            <Phone className="h-10 w-10 text-primary mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-1">Call Us</h3>
            <p className="text-gray-500">+91 902-147-8902</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6 text-center">
            <Mail className="h-10 w-10 text-primary mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-1">Email Us</h3>
            <p className="text-gray-500">ecohelp.care@gmail.com</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6 text-center">
            <Clock className="h-10 w-10 text-primary mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-1">Working Hours</h3>
            <p className="text-gray-500">Mon-Fri: 9 AM - 6 PM</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Send Us a Message</CardTitle>
            <CardDescription>
              We'll get back to you as soon as possible
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Your Message</Label>
                <Textarea
                  id="message"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>
                Quick answers to common questions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-1">What makes a product eco-friendly?</h3>
                <p className="text-sm text-gray-600">
                  Eco-friendly products are made from sustainable materials, have a low carbon footprint, 
                  and are often recyclable or biodegradable.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-1">How is the eco-score calculated?</h3>
                <p className="text-sm text-gray-600">
                  Our eco-score considers factors like material sustainability, manufacturing process, 
                  recyclability, and overall environmental impact.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-1">Can I return eco-friendly products?</h3>
                <p className="text-sm text-gray-600">
                  Yes, our return policy allows returns within 14 days of purchase. Please contact 
                  customer service for assistance.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-1">How do I become a seller?</h3>
                <p className="text-sm text-gray-600">
                  Navigate to "Become a Seller" in the sidebar, create a seller account, and you can 
                  start listing your eco-friendly products.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <HeadphonesIcon className="h-12 w-12 text-primary mr-4" />
                <div>
                  <h3 className="font-semibold text-lg">Need more help?</h3>
                  <p className="text-gray-500">
                    Our customer support team is available to assist you with any queries.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CustomerCarePage;
