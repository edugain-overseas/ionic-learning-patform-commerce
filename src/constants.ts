import certificate from "./assets/images/certificate-sample.png";

export interface CategoryTypes {
  id: number;
  description: string;
  image_path: string;
  title: string;
}

export interface courseTypes {
  quantity_test?: null | number;
  skills_text: string;
  title: string;
  c_type: string;
  about_text: string;
  id: number;
  c_duration: string;
  category_id: number;
  image_path: null | string;
  c_award: string;
  price: number;
  c_language: string;
  old_price: number;
  c_level: string;
  is_published: boolean;
  c_access: string;
  quantity_lecture: null | number;
  intro_text: string;
  icons: any[];
}

export const categories: CategoryTypes[] = [
  {
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet massa ante. Donec eget tellus libero. Ut pulvinar quam et varius accumsan. In efficitur arcu in purus finibus dignissim. Duis ante diam, eleifend malesuada auctor et, consequat eu erat. Morbi lacinia nulla lectus, sed consectetur urna venenatis in. Ut aliquam rhoncus nisi, a sodales lacus malesuada ac. Proin suscipit enim lorem, eu suscipit purus consequat sit amet.",
    id: 1,
    image_path: "static/categories/13-02-2024/filosofiya.jpeg",
    title: "Business Management",
  },
];

export const courses: courseTypes[] = [
  {
    quantity_test: null,
    skills_text:
      "Sed nibh neque, ultricies vitae placerat vitae, gravida quis dui.",
    title: "Managment pro+",
    c_type: "Online course",
    about_text: "Sed nec justo faucibus, tristique libero eget, suscipit nisl",
    id: 2,
    c_duration: "3 hours (self-paced)",
    category_id: 1,
    image_path: null,
    c_award: "Certificate",
    price: 19.99,
    c_language: "Full audio & text",
    old_price: 59.99,
    c_level: "Introductory",
    is_published: true,
    c_access: "Lifetime access",
    quantity_lecture: null,
    intro_text:
      "Nullam ex ante, dignissim in elit eget, iaculis auctor lacus. Integer eu rutrum quam. Integer diam mauris, hendrerit quis fermentum vehicula, sagittis sit amet ligula. Sed laoreet commodo ullamcorper",
    icons: [],
  },
];

export const certificates = [
  {
    name: "Certificate 1",
    images: [{ src: certificate }, { src: certificate }],
  },
  {
    name: "Certificate 2",
    images: [{ src: certificate }, { src: certificate }],
  },
  {
    name: "Certificate 3",
    images: [{ src: certificate }, { src: certificate }],
  },
  {
    name: "Certificate 4",
    images: [{ src: certificate }, { src: certificate }],
  },
  {
    name: "Certificate 5",
    images: [{ src: certificate }, { src: certificate }],
  },
  {
    name: "Certificate 6",
    images: [{ src: certificate }, { src: certificate }],
  },
  {
    name: "Certificate 7",
    images: [{ src: certificate }, { src: certificate }],
  },
  {
    name: "Certificate 8",
    images: [{ src: certificate }, { src: certificate }],
  },
  {
    name: "Certificate 9",
    images: [{ src: certificate }, { src: certificate }],
  },

  {
    name: "Certificate 10",
    images: [{ src: certificate }, { src: certificate }],
  },
];

export type PlatformStatType = {
  name: string;
  value: number;
  label: string;
};

export const platformStats = [
  {
    name: "courses",
    value: 325,
    label: "<b>Courses</b> on our platform",
  },
  {
    name: "students",
    value: 8065,
    label: "<b>Students</b> for today",
  },
  {
    name: "score",
    value: 184,
    label: "<b>Average</b> score of our students",
  },
  {
    name: "certificates",
    value: 12678,
    label: "<b>Certificates</b> issued",
  },
];
