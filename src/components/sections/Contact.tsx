"use client";

import Button from "../ui/Button";

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 bg-black">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">Let's Build Something Great</h2>
        <p className="text-white/70 mb-12">Ready to start your project? Contact us today for a free consultation.</p>
        
        <form className="bg-white/5 p-8 md:p-12 rounded-2xl border border-white/10 text-left max-w-2xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Name</label>
              <input type="text" className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 text-white placeholder:text-white/40" placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Email</label>
              <input type="email" className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 text-white placeholder:text-white/40" placeholder="john@example.com" />
            </div>
          </div>
          <div className="mb-8">
            <label className="block text-sm font-medium text-white/80 mb-2">Message</label>
            <textarea rows={4} className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 text-white placeholder:text-white/40" placeholder="Tell us about your project..."></textarea>
          </div>
          <Button type="submit" className="w-full">Send Message</Button>
        </form>
      </div>
    </section>
  );
}