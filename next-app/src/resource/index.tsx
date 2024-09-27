import {
  Bell,
  Bookmark,
  Home,
  Mail,
  Search,
  Settings,
  User,
} from "lucide-react";

export const NavbarItems = [
  {
    text: "Home",
    icon: <Home className="mr-2 h-4 w-4" />,
    Link: "/feed",
  },
  {
    text: "Explore",
    icon: <Search className="mr-2 h-4 w-4" />,
    Link: "/explore",
  },
  {
    text: "Notifications",
    icon: <Bell className="mr-2 h-4 w-4" />,
    Link: "/notifications",
  },
  {
    text: "Messages",
    icon: <Mail className="mr-2 h-4 w-4" />,
    Link: "/messages",
  },
  {
    text: "Bookmarks",
    icon: <Bookmark className="mr-2 h-4 w-4" />,
    Link: "/bookmarks",
  },
  {
    text: "Profile",
    icon: <User className="mr-2 h-4 w-4" />,
    Link: "/profile",
  },
  {
    text: "Settings",
    icon: <Settings className="mr-2 h-4 w-4" />,
    Link: "/settings",
  },
];

export const profileDefualtImage1 =
  "https://i.pinimg.com/originals/20/cb/f3/20cbf31ecf279ccab1a3264a2cec80c6.jpg";
export const profileDefualtImage2 =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAlAMBIgACEQEDEQH/xAAcAAEAAAcBAAAAAAAAAAAAAAAAAQIDBAYHCAX/xAA1EAABAwMCBAQFAgUFAAAAAAABAAIDBAURBiESMUFRBxNhcRQigZHBMqEVI1Lh8CU1QoKx/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APbp6bZu3RXsdP6K6hg+UeyuWQ4QWrIMdFXZD6K5bEovMcLHSSODWtGST0QW1RJBSQmaoeGRjAJOyVFVS0zA6eZkbSMjJ59v/R91qPUup31XxF1jd5x8+SmoIX/MyKMNPG8jqSOv+HHbNWRVYrrnqOoqZ44GMEIZIQeIuwOEZGCBkjsd0GUeJmtqqK5T2i0Tupoom8M0rSeJz+ZaNtsbfutc/wAWuIcXCuquL+oSuH5VpLI6SR0j3Fz3ElzicklSZQXNVXVFXJJLVSGWWQ5fI/dxVsSTzUEQFHKgiCPEV7WldSVunbi2emdxxO2lge48Dx6jv6rxEQdA2bXNjusvlMqWROxyeS3H3AWRua1zQ5pDmkZBHIrl+CV8UgfG5zXDkQcFbY8KNQxR0VRR3KtZGxsjRTxv5MyMczsAT075QZ9LFnorCog9F7T2hzQ5uC08iORVrPEgx6Sn+Y7IvRki+Y7KKDKIodhsq7IlXZFgKfhwgo+WF4+o2xTQR217sGuD4/oGkkD7fbK9/Cx3Xc4otO1Vc3aSkZ5rSOeeX5Qc3XXMNRJSFpjMUjwMuJwD0+vf1XnFxwRk4PMZWSXiKtv1VVV8clHUVDCWyRUsQY8tHJ/CAM+pG/dY2RjdBKiIgIiICIiAiIgK5t+Pi4c+WBxjJlGWgdyOqtlFB0ToN7pbE0iojna17g2SNpa0jpseXf8AzC9qZuywDwivktZQG1tpmMbSNGXsdjiz1I6lbDlCDzXt+Yoqr2/MUQZsYwAqLm4KuS7KpOGUFHCxjVtJUXmVtkhqIaZs9O6R7pIw9zwDjDQduoyemR3WVcKsbraqa5xxtqRI18TuOKaF5ZJG7u1w5e3Xqg0Vc/Da+afqPiaapkfSNbxGogi4nRHpxMBzj1Gcdlr+o82aWR8vE+Tm88P7n7j7rr2nh8qFkbpHylox5j/1O91h+vqTT9h01drnJbKX4qqg8gZbjjJIIH3AP0Qc1uAHJSqLufdQQEREBERAREQFEKCiOSDofw907T2ix0lRC0smqKdrpi12Q8nfOO4WSytXj+HkvnaLtLycn4cDJ7jb8L3ZGoPOe35iiqvb8xRBlGU4lKiCJKkJUSpUHh3bUkVJcI7XQU8lwusgz8NCRiJv9UjuTB77notReLFxvd6ijkrI6OCjo5DEYaeoMh83O/FkDfHLbkvb05Q6ssVyvt0ssVLdGfxGWGpppiRLLwOJy13ff+yxbX19uHxzqyMspI62Rs3wUsWJoHtYGO4gRyzxe6DX55BSqJOVBAREQEREBERAUQoK8tNMa250dI0jM87IxnllzgPyg6P0LQOt2krZTSN4XiAOcD3O/wCV7TwpoYhDEyJv6WNDR9FF4QWjm/MiqOG6gg93ChhVMKGEFMhQwqpUh5oMI/jFNpV2p4ayRkU3mS3CkZK4NFQHMDiGnqQ8FuOfLuueLzdKy83Ca4XGYy1Mzsvcf2A7Adl13NGyWN0UrGvjcC1zHDIIPRaR8VdA2ey0zrnazJThwc40/NgOWjA7fqQakRRPsoICIiAiIgIiIIhbK8F9MNud0kvFVHxU9C4CIHkZcduuNj9lr230c9wrYaOkjMk87xHG0dSV1NpiyQaesVLbaYYETcvPd53cfugvnDBUj1WcFTcEFq4bop3DdEHtoiIJVKVMVLhBBay8foKp+maKWLPw8dT/ADd+RIOPcLaGFjfiPb5rloq5U1M5jZiwOa5w2GHDPttlBysVBTysdFI6OQcLmkgjsQpEBERAREQFEblQURzQbv8ABHR5p6Qamr4yJZgW0bXD9LORf9eQ9FtU+i5k0hqu8W7UFte24VUkLZGQmGSZzmGM4bw4JxgDl2wumn7d/qgpuKpuKmeVScgpu5qKkdzRB7+FAhVcBOFBQwiqlqkIQSqSaNk8UkMrQ5kjS1wPUHZVFDCDlTxDooLdqyso6cYEXCHHu7G5WNrfGu/CGS9Xaoutmr4IX1B45Yani4QepDgDgemFrWfRJggrqmS5wmmpMNMzIyWvfvsMkH6+qDEUUSoICIiAiIg9PTNPJV6htkEDeKSSqjDR/wBgus3j6rkCiq6ihqWVNHNJBPGcskjdhzT6Fb/8ItY1GpbbPRXabzbhSHPmEYMsZ5E9yNx9kGdPaqTgrlzVTcEFo4bqKqlu6IPcRMqVxQHKQoVBBBRAT32xuVqDxb8Rp6MOs1inaxz28NRKBl4BHQ9EF94ta+ioaSax2eqb8ZL8k8rXD+U08x7+y1LTX5lLY6u1Sv8AiBJIXtd0BxjbPQ4G6xyR7pHue9xc5xyXE5JKkQROMnHLooIiAiIgIiIC9nSmoKvTN4guNE4cTTwyMPKRnVp9+/ReMiDfVr8Z7LV1rIa6jqKKJ5x5xIe1vuBvhbGiliqIGTU8jJYnjLJI3BzXA9iFx+sh01rK96ad/pdY4Qk5dTyjjjd9On0wg6ccN0WqKTxspjA346yyCf8A5eTKC0+2d0QbwKlKm3UEEFZXC7Wy2/7jcaSlz0mmaw/upLxf7TY4DLdbhT0zegkf8x9hzK5h8Qbjb7tqetr7ZUz1EU8pfxytxj0APRBvO/6vp7hE6ks0wexzgHTsOx33x6bFc8aik8291z+MPBmduDkbbKwbLIwYY9zRz2OFLlBBERAREQEREBERAREQEREBERB2srG/VclBY62sg4fNhp3vZkZGQERBx9W1U9dUyVNXK+WaRxc97ySSVQREBERAREQEREBERAREQEREBERAREQf/9k=";
