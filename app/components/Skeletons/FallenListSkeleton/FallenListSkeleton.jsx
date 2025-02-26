import ProfileCardSkeleton from "../ProfileCardSkeleton";

export default function FallenListSkeleton({ limit = 8 }) {
  return (
    <>
      {Array.from({ length: limit }).map((_, i) => (
        <ProfileCardSkeleton key={i} />
      ))}
    </>
  );
}
