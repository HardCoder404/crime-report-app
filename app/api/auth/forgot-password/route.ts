import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { emailTemplate } from "../../../../lib/emailTemplate.js";

const transporter = nodemailer.createTransport({
  service: "Gmail", // Use your email service provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
      select: { name: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User with this email does not exist" },
        { status: 404 }
      );
    }

    // Generate OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Save OTP and expiration time in the database
    const expirationTime = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes
    await prisma.otp.create({
      data: {
        email,
        otp,
        expiresAt: expirationTime,
      },
    });

    // Send OTP via email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset OTP",
      html: emailTemplate(user, otp),
    });

    return NextResponse.json(
      { message: "OTP sent to your email" },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: "Error processing forgot password request" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { email, otp, newPassword } = await request.json();

    // Validate input
    if (!email || !otp || !newPassword) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if OTP is valid
    const otpRecord = await prisma.otp.findFirst({
      where: { email, otp },
    });

    if (!otpRecord || otpRecord.expiresAt < new Date()) {
      return NextResponse.json(
        { error: "Invalid or expired OTP" },
        { status: 400 }
      );
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password
    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    // Delete OTP record after successful password reset
    await prisma.otp.deleteMany({
      where: { email },
    });

    return NextResponse.json(
      { message: "Password reset successful" },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Verify OTP error:", error);
    return NextResponse.json({ error: "Error verifying OTP" }, { status: 500 });
  }
}
