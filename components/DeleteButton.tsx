import { Button } from "@/components/ui/button";

type Props = {
  handleClick: () => void;
};
export function DeleteButton({ handleClick }: Props) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
      onClick={handleClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 5H9l-7 7 7 7h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z" />
        <line x1="18" x2="12" y1="9" y2="15" />
        <line x1="12" x2="18" y1="9" y2="15" />
      </svg>
    </Button>
  );
}
