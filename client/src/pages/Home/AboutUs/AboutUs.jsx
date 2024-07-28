import PrimaryButton from "../../../components/Home/PrimaryButton/PrimaryButton";

const AboutUs = () => {
  const contentList = [
    {
      number: 63700,
      label: "Successful Students",
    },
    {
      number: 30000,
      label: "Expert Freelancers",
    },
    {
      number: 20000,
      label: "Skilled Job Holders",
    },
    {
      number: 600,
      label: "Industry Expert",
    },
    {
      number: 91,
      label: "Success Ratio",
    },
    {
      number: 700,
      label: "Companies",
    },
  ];

  return (
    <div className="container mx-auto px-4">
      <div className="text-center">
        <h2 className="text-[#cf0000] text-4xl pb-7 font-bold">
          আমাদের সম্পর্কে
        </h2>
        <p className="text-[#605f62] pb-14 max-w-2xl mx-auto leading-7">
          সানউইংস ট্রেনিং সেন্টার হল এমন একটি প্রতিষ্ঠান যেখানে শিক্ষার একটি
          চমৎকার মান দিয়ে সম্প্রদায়কে ক্ষমতায়ন করা আমাদের কাম্য। আমরা আমাদের
          নেতাদের ক্রমাগত উন্নতির জন্য চেষ্টা করি যারা একটি ভাল ভবিষ্যত গঠনে কাজ
          করবে। আমরা ব্যক্তিদের সাফল্যে অবদান রাখার জন্য এবং সর্বোত্তম স্বার্থে
          সমাজের সেবা করার জন্য আমাদের জ্ঞান ভাগ করে নেব।
        </p>
      </div>
      <div className="flex flex-col-reverse lg:flex-row items-center justify-center lg:gap-3 gap-14 py-8">
        <div className="lg:w-1/2 w-full">
          <p className="text-lg font-bold text-[#fb312e]">
            Successfully 15 Year&apos;s
          </p>
          <h2 className="text-[#1f1e1e] font-bold text-4xl leading-tight mt-2">
            World-Renowned Businessman Making Organization
          </h2>
          <p className="text-[#605f62] text-base leading-7 py-6">
            সানউইংস ট্রেনিং সেন্টার গত 3 বছর ধরে আইটি বিশেষজ্ঞ তৈরির লক্ষ্য
            নিয়ে কাজ করছে। একটি দ্রুত গতিশীল বিশ্বে, যেখানে প্রতিটি সেক্টর
            প্রযুক্তির উপর নির্ভর করে, আপনাকে একটি উন্নত ভবিষ্যত সুরক্ষিত করতে
            আইটি দক্ষতা বিকাশ করতে হবে। অত্যন্ত নিষ্ঠার সাথে, আমরা 70,000 এরও
            বেশি আইটি বিশেষজ্ঞ তৈরি করতে সক্ষম হয়েছি যারা বর্তমানে বিভিন্ন
            সেক্টরে কাজ করছে।
          </p>
          <PrimaryButton text="Browse Course" />
        </div>
        <img
          className="lg:w-1/2 w-full rounded-2xl"
          src="https://www.creativeitinstitute.com/images/featured/02_default.jpg"
          alt="Sunwings Training Centre"
        />
      </div>
      <div className="flex flex-wrap gap-5 items-center justify-center pb-9">
        {contentList.map(({ number, label }) => (
          <div
            className="flex flex-col items-center justify-center px-8 py-4 bg-[#faf9fd] rounded-lg"
            key={label}
          >
            <p className="text-[#cf0000] text-2xl leading-9 font-bold">
              {number}
              {label === "Success Ratio" ? "%" : "+"}
            </p>
            <p className="text-[#1f1e1e] text-lg leading-5 font-bold">
              {label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
