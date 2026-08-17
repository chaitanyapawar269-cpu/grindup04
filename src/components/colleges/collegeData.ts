export type College = {
  id: number;
  name: string;
  city: string;
  state: string;
  students: number;
  programs: string[];
};

const seeds: [string, string, string][] = [
  ['Indian Institute of Technology Bombay', 'Mumbai', 'Maharashtra'], ['Indian Institute of Technology Delhi', 'New Delhi', 'Delhi'], ['Indian Institute of Technology Madras', 'Chennai', 'Tamil Nadu'], ['Indian Institute of Technology Kanpur', 'Kanpur', 'Uttar Pradesh'], ['Indian Institute of Technology Kharagpur', 'Kharagpur', 'West Bengal'], ['Indian Institute of Technology Roorkee', 'Roorkee', 'Uttarakhand'], ['Indian Institute of Technology Guwahati', 'Guwahati', 'Assam'], ['Indian Institute of Technology Hyderabad', 'Hyderabad', 'Telangana'], ['National Institute of Technology Tiruchirappalli', 'Tiruchirappalli', 'Tamil Nadu'], ['National Institute of Technology Karnataka', 'Surathkal', 'Karnataka'], ['National Institute of Technology Warangal', 'Warangal', 'Telangana'], ['Delhi Technological University', 'New Delhi', 'Delhi'], ['Netaji Subhas University of Technology', 'New Delhi', 'Delhi'], ['Vellore Institute of Technology', 'Vellore', 'Tamil Nadu'], ['Manipal Institute of Technology', 'Manipal', 'Karnataka'], ['BITS Pilani', 'Pilani', 'Rajasthan'], ['BITS Goa', 'Goa', 'Goa'], ['BITS Hyderabad', 'Hyderabad', 'Telangana'], ['PES University', 'Bengaluru', 'Karnataka'], ['RV College of Engineering', 'Bengaluru', 'Karnataka'], ['MS Ramaiah Institute of Technology', 'Bengaluru', 'Karnataka'], ['BMS College of Engineering', 'Bengaluru', 'Karnataka'], ['Thapar Institute of Engineering and Technology', 'Patiala', 'Punjab'], ['Amrita Vishwa Vidyapeetham', 'Coimbatore', 'Tamil Nadu'], ['SRM Institute of Science and Technology', 'Chennai', 'Tamil Nadu'], ['Sathyabama Institute of Science and Technology', 'Chennai', 'Tamil Nadu'], ['SSN College of Engineering', 'Chennai', 'Tamil Nadu'], ['PSG College of Technology', 'Coimbatore', 'Tamil Nadu'], ['College of Engineering Pune', 'Pune', 'Maharashtra'], ['Veermata Jijabai Technological Institute', 'Mumbai', 'Maharashtra'], ['Walchand College of Engineering', 'Sangli', 'Maharashtra'], ['MIT World Peace University', 'Pune', 'Maharashtra'], ['Institute of Chemical Technology', 'Mumbai', 'Maharashtra'], ['Dhirubhai Ambani Institute of Information and Communication Technology', 'Gandhinagar', 'Gujarat'], ['Nirma University', 'Ahmedabad', 'Gujarat'], ['LNMIIT', 'Jaipur', 'Rajasthan'], ['Malaviya National Institute of Technology', 'Jaipur', 'Rajasthan'], ['University of Petroleum and Energy Studies', 'Dehradun', 'Uttarakhand'], ['Jaypee Institute of Information Technology', 'Noida', 'Uttar Pradesh'], ['KIIT University', 'Bhubaneswar', 'Odisha'], ['Kalinga Institute of Industrial Technology', 'Bhubaneswar', 'Odisha'], ['Jadavpur University', 'Kolkata', 'West Bengal'], ['Heritage Institute of Technology', 'Kolkata', 'West Bengal'], ['Chandigarh University', 'Mohali', 'Punjab'], ['Lovely Professional University', 'Phagwara', 'Punjab'], ['Graphic Era University', 'Dehradun', 'Uttarakhand'], ['Symbiosis Institute of Technology', 'Pune', 'Maharashtra'], ['Christ University', 'Bengaluru', 'Karnataka'], ['NMIMS', 'Mumbai', 'Maharashtra'], ['Bennett University', 'Greater Noida', 'Uttar Pradesh'], ['Shiv Nadar University', 'Greater Noida', 'Uttar Pradesh'], ['IIIT Hyderabad', 'Hyderabad', 'Telangana'], ['IIIT Bangalore', 'Bengaluru', 'Karnataka'], ['IIIT Delhi', 'New Delhi', 'Delhi'], ['IIIT Allahabad', 'Prayagraj', 'Uttar Pradesh'], ['MIT Academy of Engineering', 'Pune', 'Maharashtra'],
];

const programs = [['Computer Science', 'Data & AI', 'Design'], ['Engineering', 'Business', 'Analytics'], ['Computer Science', 'Electronics', 'Product Design']];

export const colleges: College[] = seeds.map(([name, city, state], index) => ({
  id: index + 1,
  name,
  city,
  state,
  students: 900 + ((index * 347) % 4200),
  programs: programs[index % programs.length],
}));
