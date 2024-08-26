import ActionIcon from "@/components/Icons/action";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaPencilAlt } from "react-icons/fa";

import { cva, type VariantProps } from "class-variance-authority"

interface EditButtonIconProps {
  id?: number;
  text?: string;
  path?: string;
  props: any;
  slug?: string;
  onClick?: () => void;
  className?: string;
}

export const EditButtonIcon: React.FC<EditButtonIconProps> = ({
  id,
  text = "Edit",
  slug,
  props,
  path,
  onClick,
  className = "",
}) => {
  const handleEdit = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className={`flex justify-center ${className}`}>
      <Button {...props} onClick={handleEdit}>
        {onClick ? (
          <Button variant="ghost" size="icon">
            <ActionIcon
              tooltip="Editar"
              icon={<FaPencilAlt className="text-gray-600 w-4 h-4" />}
            />
          </Button>
        ) : (
          <Link href={`/${path}/${slug}/editar`} passHref>
            <div className="flex items-center">Editar Datos</div>
          </Link>
        )}
      </Button>
    </div>
  );
};
