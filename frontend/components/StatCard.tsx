type StatCardProps = {
    title:string;
    value: string;
    valueClassName?: string;
};

export default function StatCard({ title , value,  valueClassName, }: StatCardProps ) {
    return (
        <div className="bg-white dark:bg-zinc-900 rounded-xl border-gray-200 shadow-md p-6 hover:shadow-lg
         transition-shadow">
            <h2 className="text-black text-sm uppercase dark:text-white tracking-wide">
                {title}</h2>
          <p className={`text-3xl font-bold text-black  mt-2 ${valueClassName ?? ""} `}>
            {value}
          </p>
        </div>
    );
}