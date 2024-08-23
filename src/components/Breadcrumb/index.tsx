import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb";
import React from "react";
  
  interface BreadcrumbComponentProps {
    items: Array<{
      label: string;
      href?: string;
    }>;
  }
  
  const BreadcrumbComponent: React.FC<BreadcrumbComponentProps> = ({ items }) => {
    return (
      <Breadcrumb className="p-2">
        <BreadcrumbList>
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                {item.href ? (
                  <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                ) : (
                  <span>{item.label}</span>
                )}
              </BreadcrumbItem>
              {index < items.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    );
  };
  
  export default BreadcrumbComponent;
  