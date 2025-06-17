import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ChevronRight, Plus } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-purple-100 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Main Dashboard Card */}
        <Card className="overflow-hidden shadow-2xl">
          <CardContent className="p-0">
            {/* Header */}
            <div className="flex items-center justify-between border-b bg-white px-6 py-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <h1 className="text-xl font-semibold text-gray-900">
                  Dashboard
                </h1>
              </div>

              {/* Navigation */}
              <div className="flex items-center gap-2">
                <Button
                  variant="default"
                  className="rounded-full bg-gray-800 hover:bg-gray-700"
                >
                  Dashboard
                </Button>
                <Button variant="ghost" className="text-gray-600">
                  Tasks
                </Button>
                <Button variant="ghost" className="text-gray-600">
                  Calendar
                </Button>
                <Button variant="ghost" className="text-gray-600">
                  Reports
                </Button>
              </div>

              {/* User Profile */}
              <div className="flex items-center gap-2 rounded-full bg-gray-800 px-4 py-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="/placeholder.svg?height=24&width=24" />
                  <AvatarFallback className="text-xs">NT</AvatarFallback>
                </Avatar>
                <span className="text-sm text-white">NiToyandug</span>
              </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-12 gap-6 p-6">
              {/* Left Sidebar */}
              <div className="col-span-3 space-y-4">
                {/* Task Status */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-lg bg-blue-50 p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-medium text-gray-700">
                        Complete
                      </span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </div>

                  <div className="flex items-center justify-between rounded-lg bg-teal-50 p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-500">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-medium text-gray-700">
                        In progress
                      </span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </div>

                  <div className="flex items-center justify-between rounded-lg bg-purple-50 p-3">
                    <div className="flex items-center gap-3">
                      <div className="h-6 w-6 rounded-full bg-purple-500"></div>
                      <span className="font-medium text-gray-700">To Do</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </div>

                  <div className="flex items-center justify-between rounded-lg bg-teal-50 p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-500">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-medium text-gray-700">To Do</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </div>

                  <div className="flex items-center justify-between p-3">
                    <span className="text-sm font-medium text-purple-600">
                      60%
                    </span>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </div>
                </div>

                {/* Calendar Widget */}
                <Card className="mt-6">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src="/placeholder.svg?height=24&width=24" />
                          <AvatarFallback className="text-xs">E</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">Evclorets</span>
                      </div>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="grid grid-cols-7 gap-1 text-xs">
                      <div className="text-center text-gray-500 p-1">MO</div>
                      <div className="text-center text-gray-500 p-1">TU</div>
                      <div className="text-center text-gray-500 p-1">WE</div>
                      <div className="text-center text-gray-500 p-1">TH</div>
                      <div className="text-center text-gray-500 p-1">FR</div>
                      <div className="text-center text-gray-500 p-1">SA</div>
                      <div className="text-center text-gray-500 p-1">SU</div>

                      {/* Calendar Days */}
                      {Array.from({ length: 35 }, (_, i) => {
                        const day = i - 6;
                        const isHighlighted = day === 20 || day === 30;
                        const isCurrentMonth = day > 0 && day <= 31;

                        return (
                          <div
                            key={i}
                            className={`text-center p-1 text-xs ${
                              isHighlighted
                                ? "bg-teal-500 text-white rounded"
                                : isCurrentMonth
                                ? "text-gray-700"
                                : "text-gray-300"
                            }`}
                          >
                            {isCurrentMonth ? day : ""}
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Main Charts Area */}
              <div className="col-span-9 space-y-6">
                {/* Project Completion Chart */}
                <Card className="bg-gradient-to-br from-purple-600 to-teal-500 text-white">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-white">
                      Project completion
                    </CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white/20 bg-white/10 text-white hover:bg-white/20"
                    >
                      REPORT
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="relative h-64">
                      {/* Chart Background Grid */}
                      <div className="absolute inset-0 opacity-20">
                        <svg className="h-full w-full">
                          <defs>
                            <pattern
                              id="grid"
                              width="40"
                              height="40"
                              patternUnits="userSpaceOnUse"
                            >
                              <path
                                d="M 40 0 L 0 0 0 40"
                                fill="none"
                                stroke="white"
                                strokeWidth="1"
                              />
                            </pattern>
                          </defs>
                          <rect width="100%" height="100%" fill="url(#grid)" />
                        </svg>
                      </div>

                      {/* Y-axis labels */}
                      <div className="absolute left-0 top-0 flex h-full flex-col justify-between text-xs">
                        <span>11101</span>
                        <span>9300</span>
                        <span>8500</span>
                        <span>7500</span>
                        <span>6745</span>
                      </div>

                      {/* Chart Area */}
                      <div className="ml-12 h-full">
                        <svg className="h-full w-full">
                          <defs>
                            <linearGradient
                              id="chartGradient"
                              x1="0%"
                              y1="0%"
                              x2="0%"
                              y2="100%"
                            >
                              <stop
                                offset="0%"
                                stopColor="rgba(255,255,255,0.3)"
                              />
                              <stop
                                offset="100%"
                                stopColor="rgba(255,255,255,0.05)"
                              />
                            </linearGradient>
                          </defs>
                          <path
                            d="M 0 180 Q 100 160 200 140 T 400 120 T 600 100 L 600 240 L 0 240 Z"
                            fill="url(#chartGradient)"
                            stroke="rgba(255,255,255,0.8)"
                            strokeWidth="2"
                          />
                        </svg>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Bottom Charts */}
                <div className="grid grid-cols-2 gap-6">
                  {/* Task Performance Chart */}
                  <Card className="bg-gray-800 text-white">
                    <CardHeader>
                      <CardTitle className="text-white">
                        Task performance over time
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="relative h-32">
                        <svg className="h-full w-full">
                          <path
                            d="M 0 80 Q 50 60 100 70 T 200 65 T 300 60"
                            fill="none"
                            stroke="#8b5cf6"
                            strokeWidth="2"
                          />
                          <path
                            d="M 0 100 Q 50 90 100 85 T 200 80 T 300 75"
                            fill="none"
                            stroke="#06b6d4"
                            strokeWidth="2"
                          />
                          <circle cx="250" cy="65" r="4" fill="white" />
                          <circle cx="280" cy="75" r="3" fill="#10b981" />
                        </svg>

                        {/* Y-axis labels */}
                        <div className="absolute left-0 top-0 flex h-full flex-col justify-between text-xs opacity-60">
                          <span>514</span>
                          <span>501</span>
                          <span>502</span>
                          <span>855</span>
                          <span>101</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Resource Allocation Chart */}
                  <Card className="bg-gray-800 text-white">
                    <CardHeader>
                      <CardTitle className="text-white">
                        Resource allocation
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center">
                      <div className="relative h-32 w-32">
                        <svg className="h-full w-full" viewBox="0 0 100 100">
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke="#10b981"
                            strokeWidth="20"
                            strokeDasharray="75 25"
                            strokeDashoffset="0"
                            transform="rotate(-90 50 50)"
                          />
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke="#8b5cf6"
                            strokeWidth="20"
                            strokeDasharray="50 50"
                            strokeDashoffset="-75"
                            transform="rotate(-90 50 50)"
                          />
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke="#6366f1"
                            strokeWidth="20"
                            strokeDasharray="25 75"
                            strokeDashoffset="-125"
                            transform="rotate(-90 50 50)"
                          />
                        </svg>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
