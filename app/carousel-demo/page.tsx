"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export default function CarouselDemo() {
  const features = [
    {
      title: "Spreadsheet Features",
      content: [
        "100 rows × 26 columns (A-Z)",
        "Fully editable cells",
        "Keyboard navigation support",
        "Excel-like visual design",
        "Sticky headers for easy reference"
      ]
    },
    {
      title: "Keyboard Shortcuts",
      content: [
        "Tab - Move to next cell (right)",
        "Shift + Tab - Move to previous cell (left)",
        "Enter - Move to cell below",
        "Click any cell to start editing"
      ]
    },
    {
      title: "💡 Tips",
      content: [
        "Import contact data with column headers",
        "Edit any contact information directly",
        "Add new contacts by editing empty rows",
        "Use drag handle to resize spreadsheet view",
        "All changes are saved automatically"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">WA Bulk Messenger Features</h1>
        <Carousel className="w-full max-w-xs mx-auto">
          <CarouselContent>
            {features.map((feature, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <div className="text-center">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">{feature.title}</h2>
                        <ul className="space-y-2 text-sm text-gray-600">
                          {feature.content.map((item, itemIndex) => (
                            <li key={itemIndex} className="text-left">• {item}</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}