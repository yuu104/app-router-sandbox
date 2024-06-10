import { Button } from "@/components/ui/button";

type Props = {
  handleClick: () => void;
};
export function SaveButton({ handleClick }: Props) {
  return (
    <Button
      type="button"
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
        <path d="M20 6 9 17l-5-5" />
      </svg>
    </Button>
  );
}
