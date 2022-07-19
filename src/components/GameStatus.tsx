interface GameStatusProps {
  children: React.ReactNode;
  status: boolean;
}

export function GameStatus({ children, status }: GameStatusProps) {
  return status ? children : (null as any);
}
