"use client";

import React, { useState } from "react";
import { SeparatorPro } from "@/components/ui/seperatorpro";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/animated-tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function Button({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`bg-primary text-primary-foreground shadow hover:bg-primary/90
         inline-flex items-center justify-center gap-2 whitespace-nowrap
         rounded-md text-sm font-medium transition-colors
         focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring
         disabled:pointer-events-none disabled:opacity-50
         [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-9 px-4 py-2`}
    >
      {children}
    </button>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none
         file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium
         disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm
         focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]
         aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive`}
    />
  );
}

function Label({
  children,
  htmlFor,
}: {
  children: React.ReactNode;
  htmlFor?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    >
      {children}
    </label>
  );
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex min-h-[60px] w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none
         file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium
         disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm
         focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]
         aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive`}
    />
  );
}

export default function SeperatorProDemo() {
  const [activeTab, setActiveTab] = useState<string | null>(null);

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setActiveTab(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4" onClick={handleOutsideClick}>
      <div className="max-w-md mx-auto mt-10 px-4 py-6 space-y-8">
        <div>
          <h1 className="text-xl font-bold">WA Bulk Messenger</h1>
          <p className="text-sm text-muted-foreground mb-4">
            A powerful WhatsApp bulk messaging platform for efficient communication campaigns.
          </p>
          <SeparatorPro variant="default" className="my-4" />
          <div className="flex items-center justify-center space-x-4 text-sm">
            <span
              className="hover:underline cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setActiveTab(activeTab === "create" ? null : "create");
              }}
            >
              Create Message Template
            </span>
            <SeparatorPro
              variant="default"
              orientation="vertical"
              className="h-4"
            />
            <span
              className="hover:underline cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setActiveTab(activeTab === "preview" ? null : "preview");
              }}
            >
              Preview Message Template
            </span>
            <SeparatorPro
              variant="default"
              orientation="vertical"
              className="h-4"
            />
            <span
              className="hover:underline cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setActiveTab(activeTab === "select" ? null : "select");
              }}
            >
              Select Contacts
            </span>
          </div>
        </div>

      {/* Inline Animated Tab */}
      {activeTab && (
        <div className="mt-8 animate-in slide-in-from-bottom-4 duration-300" onClick={(e) => e.stopPropagation()}>
          {activeTab === "create" && (
            <Tabs defaultValue="template">
              <TabsList>
                <TabsTrigger value="template">Template</TabsTrigger>
                <TabsTrigger value="columns">Columns</TabsTrigger>
              </TabsList>

              <TabsContent value="template">
                <Card>
                  <CardHeader>
                    <CardTitle>Message Template</CardTitle>
                    <CardDescription>
                      Create a personalized message template for your WhatsApp campaign.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="template-content">Template Content</Label>
                      <Textarea
                        id="template-content"
                        placeholder="Enter your message template. Use {{name}} for personalization..."
                        rows={4}
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Save Template</Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="columns">
                <Card>
                  <CardHeader>
                    <CardTitle>Column Mapping</CardTitle>
                    <CardDescription>
                      Map your spreadsheet columns to template variables.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="name-column">Name Column</Label>
                      <select className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                        <option>Select column...</option>
                        <option>Name (name)</option>
                        <option>Phone (phone)</option>
                        <option>Email (email)</option>
                      </select>
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="phone-column">Phone Column</Label>
                      <select className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                        <option>Select column...</option>
                        <option>Name (name)</option>
                        <option>Phone (phone)</option>
                        <option>Email (email)</option>
                      </select>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Update Mapping</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          )}

          {activeTab === "preview" && (
            <Card>
              <CardHeader>
                <CardTitle>Message Preview</CardTitle>
                <CardDescription>
                  See how your message will appear to recipients.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="bg-gray-50 border border-gray-300 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-2">
                    <strong>Sample Message:</strong>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-3 text-sm text-gray-800 leading-relaxed">
                    Hello John Doe! Thank you for being our valued customer. We hope you're enjoying our services.
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    Preview shows data from the first contact row
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Send Test Message</Button>
              </CardFooter>
            </Card>
          )}

          {activeTab === "select" && (
            <Card>
              <CardHeader>
                <CardTitle>Contact Selection</CardTitle>
                <CardDescription>
                  Choose which contacts to include in your messaging campaign.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="contact-range">Select Contact Range</Label>
                  <select className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                    <option>Select option...</option>
                    <option>All Contacts (5)</option>
                    <option>Valid Phone Numbers (5)</option>
                  </select>
                </div>
                <div className="text-sm text-gray-600">
                  5 contacts imported • Ready for WhatsApp bulk messaging
                </div>
              </CardContent>
              <CardFooter>
                <Button>Confirm Selection</Button>
              </CardFooter>
            </Card>
          )}
        </div>
      )}
      </div>
    </div>
  );
}