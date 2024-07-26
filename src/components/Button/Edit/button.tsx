import ActionIcon from "@/components/Icons/action";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FaPencilAlt } from "react-icons/fa";

interface EditButtonIconProps {
  id?: number;
  text?: string;
  path?: string;
  slug?: string;
  onClick?: () => void;
  className?: string;
}

export const EditButtonIcon: React.FC<EditButtonIconProps> = ({
  id,
  text = "Edit",
  slug,
  path,
  onClick,
  className = "",
}) => {
  const router = useRouter();
  const handleEdit = () => {
    if (onClick) {
      onClick();
    } else {
      router.push(`/${path}/${slug}/editar`);
    }
  };

  return (
    <div className={`flex justify-center ${className}`}>
      <Button variant="ghost" onClick={handleEdit} size={"icon"}>
        {onClick ? (
          <Button variant="ghost" size="icon">
            <ActionIcon
              tooltip="Editar"
              icon={<FaPencilAlt  className="text-gray-600 w-4 h-4" />}
            />
          </Button>
        ) : (
          "Editar Datos"
        )}
      </Button>
    </div>
  );
};
