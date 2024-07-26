import ActionIcon from "@/components/Icons/action";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FaRegEye } from "react-icons/fa";

export const ViewButton = ({
  slug,
  text,
  path,
}: {
  slug: string;
  text: string;
  path: string;
}) => {
  const router = useRouter();
  const handleEdit = () => {
    router.push(`/usuarios/${path}/${slug}`);
  };

  return (
    <div className="flex justify-center">
      <Button variant="ghost" size="icon" onClick={handleEdit}>
        <ActionIcon
          tooltip={text}
          icon={<FaRegEye className="w-4 h-4" color="gray" />}
        />
      </Button>
    </div>
  );
};
