import Link from "next/link";
import ActionIcon from "@/components/Icons/action";
import { Button } from "@/components/ui/button";
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
  return (
    <div className="flex justify-center">
      <Link href={`/usuarios/${path}/${slug}`}>
        <Button variant="ghost" size="icon">
          <ActionIcon
            tooltip={text}
            icon={<FaRegEye className="w-4 h-4" color="gray" />}
          />
        </Button>
      </Link>
    </div>
  );
};
